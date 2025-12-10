import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;

    const mockUserService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
    };

    const mockJwtService = {
        signAsync: jest.fn(),
        sign: jest.fn(),
    };

    const mockConfigService = {
        get: jest.fn(),
    };

    const mockRoleRepo = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: mockUserService },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
                { provide: getRepositoryToken(Role), useValue: mockRoleRepo },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jest.clearAllMocks();
    });

    describe('login', () => {
        const loginDto = {
            email: 'test@example.com',
            password: 'Password@123',
        };

        it('debe autenticar y retornar tokens correctamente', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
                role: { id: 1, name: 'customer' },
                isActive: true,
            };

            mockUserService.findByEmail.mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            mockJwtService.sign.mockReturnValue('jwt-token');
            mockConfigService.get.mockReturnValue('secret');

            const result = await service.login(loginDto);

            expect(result).toHaveProperty('accessToken');
            expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.password);
        });

        it('debe lanzar error si el usuario no existe', async () => {
            mockUserService.findByEmail.mockResolvedValue(null);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('debe lanzar error si la contraseña es incorrecta', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
            };

            mockUserService.findByEmail.mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('register', () => {
        const registerDto = {
            name: 'New User',
            email: 'newuser@example.com',
            password: 'Password@123',
        };

        it('debe registrar un nuevo usuario correctamente', async () => {
            const defaultRole = { id: 1, name: 'customer' };
            const createdUser = { id: 1, ...registerDto, role: defaultRole };

            mockRoleRepo.findOne.mockResolvedValue(defaultRole);
            mockUserService.create.mockResolvedValue(createdUser);

            const result = await service.register(registerDto);

            expect(result).toBeDefined();
            expect(mockUserService.create).toHaveBeenCalledWith({
                ...registerDto,
                roleId: defaultRole.id,
            });
        });

        it('debe lanzar error si no existe el rol por defecto', async () => {
            mockRoleRepo.findOne.mockResolvedValue(null);

            await expect(service.register(registerDto)).rejects.toThrow();
        });
    });
});
