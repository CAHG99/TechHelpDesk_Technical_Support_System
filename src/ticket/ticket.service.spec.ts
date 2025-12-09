import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket, TicketStatus, TicketPriority } from './entities/ticket.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Client } from '../client/entities/client.entity';
import { Technician } from '../technician/entities/technician.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TicketService', () => {
  let service: TicketService;

  const mockTicketRepo = {
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockUserRepo = { findOne: jest.fn() };
  const mockCategoryRepo = { findOne: jest.fn() };
  const mockClientRepo = { findOne: jest.fn() };
  const mockTechnicianRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: getRepositoryToken(Ticket), useValue: mockTicketRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepo },
        { provide: getRepositoryToken(Client), useValue: mockClientRepo },
        { provide: getRepositoryToken(Technician), useValue: mockTechnicianRepo },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);

    jest.clearAllMocks();
  });

  // ✅ TEST 1: Creación de tickets
  it('debe crear un ticket correctamente', async () => {
    const dto = {
      title: 'Problema con el PC',
      description: 'No enciende',
      customerId: 1,
      categoryId: 2,
      clientId: 3,
      priority: TicketPriority.HIGH,
    };

    mockUserRepo.findOne.mockResolvedValue({ id: 1 });
    mockCategoryRepo.findOne.mockResolvedValue({ id: 2 });
    mockClientRepo.findOne.mockResolvedValue({ id: 3 });
    mockTicketRepo.create.mockReturnValue(dto);
    mockTicketRepo.save.mockResolvedValue({ id: 10, ...dto });

    const result = await service.create(dto);

    expect(result).toBeDefined();
    expect(mockTicketRepo.create).toHaveBeenCalled();
    expect(mockTicketRepo.save).toHaveBeenCalled();
  });

  // ✅ TEST 2: Cambio de estado
  it('debe cambiar el estado del ticket correctamente', async () => {
    const ticket = {
      id: 1,
      status: TicketStatus.OPEN,
      technician: null,
    };

    mockTicketRepo.findOne.mockResolvedValue(ticket);
    mockTicketRepo.save.mockResolvedValue({
      ...ticket,
      status: TicketStatus.IN_PROGRESS,
    });

    const dto = { status: TicketStatus.IN_PROGRESS };

    const result = await service.updateStatus(1, dto);

    expect(result.status).toBe(TicketStatus.IN_PROGRESS);
    expect(mockTicketRepo.save).toHaveBeenCalled();
  });

  // ✅ TEST EXTRA: Ticket no encontrado
  it('debe lanzar error si el ticket no existe', async () => {
    mockTicketRepo.findOne.mockResolvedValue(null);

    await expect(
      service.updateStatus(999, { status: TicketStatus.IN_PROGRESS }),
    ).rejects.toThrow(NotFoundException);
  });
});
