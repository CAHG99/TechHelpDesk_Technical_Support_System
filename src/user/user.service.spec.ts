import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
    let service: UserService;

    const mockUserRepo = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        find: jest.fn(),
        findAndCount: jest.fn(),
        softDelete: jest.fn(),
    };

    const mockRoleRepo = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getRepositoryToken(User), useValue: mockUserRepo },
                { provide: getRepositoryToken(Role), useValue: mockRoleRepo },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        jest.clearAllMocks();
    });

    describe('create', () => {
        const createUserDto = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password@123',
            roleId: 1,
        };

        it('debe crear un usuario correctamente', async () => {
            mockRoleRepo.findOne.mockResolvedValue({ id: 1, name: 'customer' });
            mockUserRepo.findOne.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            mockUserRepo.create.mockReturnValue({ ...createUserDto, password: 'hashedPassword' });
            mockUserRepo.save.mockResolvedValue({ id: 1, ...createUserDto });

            const result = await service.create(createUserDto);

            expect(result).toBeDefined();
            expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
            expect(mockUserRepo.save).toHaveBeenCalled();
        });

        it('debe lanzar error si el rol no existe', async () => {
            mockRoleRepo.findOne.mockResolvedValue(null);

            await expect(service.create(createUserDto)).rejects.toThrow(BadRequestException);
        });

        it('debe lanzar error si el email ya existe', async () => {
            mockRoleRepo.findOne.mockResolvedValue({ id: 1 });
            mockUserRepo.findOne.mockResolvedValue({ id: 2, email: createUserDto.email });

            await expect(service.create(createUserDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('findOne', () => {
        it('debe retornar un usuario por ID', async () => {
            const user = { id: 1, name: 'John', email: 'john@test.com' };
            mockUserRepo.findOne.mockResolvedValue(user);

            const result = await service.findOne(1);

            expect(result).toBeDefined();
        });

        it('debe lanzar error si el usuario no existe', async () => {
            mockUserRepo.findOne.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findAll', () => {
        it('debe retornar usuarios paginados', async () => {
            const users = [
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' },
            ];

            mockUserRepo.findAndCount.mockResolvedValue([users, 20]);

            const result = await service.findAll({ limit: 2, offset: 0 });

            expect(result.data).toHaveLength(2);
            expect(result.total).toBe(20);
        });
    });

    describe('findByEmail', () => {
        it('debe retornar un usuario por email', async () => {
            const user = { id: 1, email: 'test@example.com' };
            mockUserRepo.findOne.mockResolvedValue(user);

            const result = await service.findByEmail('test@example.com');

            expect(result).toBeDefined();
            expect(result?.email).toBe('test@example.com');
        });
    });

    describe('remove', () => {
        it('debe eliminar (soft delete) un usuario correctamente', async () => {
            const user = { id: 1, name: 'John' };
            mockUserRepo.findOneBy.mockResolvedValue(user);
            mockUserRepo.softDelete.mockResolvedValue({ affected: 1 });

            await service.remove(1);

            expect(mockUserRepo.softDelete).toHaveBeenCalledWith(1);
        });

        it('debe lanzar error si el usuario no existe', async () => {
            mockUserRepo.findOneBy.mockResolvedValue(null);

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
