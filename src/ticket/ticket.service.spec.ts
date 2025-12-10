import { Test, TestingModule } from "@nestjs/testing";
import { TicketService } from "./ticket.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Ticket, TicketStatus, TicketPriority } from "./entities/ticket.entity";
import { User } from "../user/entities/user.entity";
import { Category } from "../category/entities/category.entity";
import { Client } from "../client/entities/client.entity";
import { Technician } from "../technician/entities/technician.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("TicketService", () => {
  let service: TicketService;

  const mockTicketRepo = {
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
  };

  const mockUserRepo = { findOne: jest.fn() };
  const mockCategoryRepo = { findOne: jest.fn() };
  const mockClientRepo = { findOne: jest.fn() };
  const mockTechnicianRepo = { findOne: jest.fn(), count: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: getRepositoryToken(Ticket), useValue: mockTicketRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepo },
        { provide: getRepositoryToken(Client), useValue: mockClientRepo },
        {
          provide: getRepositoryToken(Technician),
          useValue: mockTechnicianRepo,
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);

    jest.clearAllMocks();
  });

  describe("create", () => {
    const createTicketDto = {
      title: "Problema con el PC",
      description: "No enciende",
      customerId: 1,
      categoryId: 2,
      clientId: 3,
      priority: TicketPriority.HIGH,
    };

    it("debe crear un ticket correctamente", async () => {
      mockUserRepo.findOne.mockResolvedValue({ id: 1 });
      mockCategoryRepo.findOne.mockResolvedValue({ id: 2 });
      mockClientRepo.findOne.mockResolvedValue({ id: 3 });
      mockTicketRepo.create.mockReturnValue(createTicketDto);
      mockTicketRepo.save.mockResolvedValue({ id: 10, ...createTicketDto });

      const result = await service.create(createTicketDto);

      expect(result).toBeDefined();
      expect(mockTicketRepo.create).toHaveBeenCalled();
      expect(mockTicketRepo.save).toHaveBeenCalled();
    });

    it("debe lanzar error si el cliente no existe", async () => {
      mockUserRepo.findOne.mockResolvedValue({ id: 1 });
      mockCategoryRepo.findOne.mockResolvedValue({ id: 2 });
      mockClientRepo.findOne.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it("debe lanzar error si la categoría no existe", async () => {
      mockUserRepo.findOne.mockResolvedValue({ id: 1 });
      mockCategoryRepo.findOne.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it("debe lanzar error si el usuario no existe", async () => {
      mockUserRepo.findOne.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe("updateStatus", () => {
    it("debe cambiar el estado del ticket correctamente", async () => {
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

    it("debe lanzar error si el ticket no existe", async () => {
      mockTicketRepo.findOne.mockResolvedValue(null);

      await expect(
        service.updateStatus(999, { status: TicketStatus.IN_PROGRESS })
      ).rejects.toThrow(NotFoundException);
    });

    it("debe rechazar transiciones inválidas (CLOSED -> OPEN)", async () => {
      const ticket = {
        id: 1,
        status: TicketStatus.CLOSED,
        technician: null,
      };

      mockTicketRepo.findOne.mockResolvedValue(ticket);

      await expect(
        service.updateStatus(1, { status: TicketStatus.OPEN })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("findAll", () => {
    it("debe retornar tickets paginados", async () => {
      const tickets = [
        { id: 1, title: "Ticket 1" },
        { id: 2, title: "Ticket 2" },
      ];

      mockTicketRepo.findAndCount.mockResolvedValue([tickets, 10]);

      const result = await service.findAll({ limit: 2, offset: 0 });

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(10);
      expect(result.hasMore).toBe(true);
    });

    it("debe usar valores por defecto si no se pasan parámetros", async () => {
      mockTicketRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.findAll();

      expect(mockTicketRepo.findAndCount).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
        order: { createdAt: "DESC" },
      });
    });
  });

  describe("findOne", () => {
    it("debe retornar un ticket por ID", async () => {
      const ticket = { id: 1, title: "Test Ticket" };
      mockTicketRepo.findOne.mockResolvedValue(ticket);

      const result = await service.findOne(1);

      expect(result).toBeDefined();
    });

    it("debe lanzar error si el ticket no existe", async () => {
      mockTicketRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

});

