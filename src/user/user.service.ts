import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResponseUserDto } from "./dto/response-user.dto";
import { plainToInstance } from "class-transformer";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "src/role/entities/role.entity";
import { PaginationDto } from "../common/dto/pagination.dto";
import { PaginatedResponseDto } from "../common/dto/paginated-response.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  /**
   * Create a new user in the system
   * Validates that the role exists and email is unique
   * Automatically hashes the password before storage
   * 
   * @param createUserDto - User creation data transfer object
   * @returns Promise with created user response DTO
   * @throws {BadRequestException} If role doesn't exist
   * @throws {BadRequestException} If email already registered
   * 
   * @example
   * const user = await userService.create({
   *   name: 'John Doe',
   *   email: 'john@example.com',
   *   password: 'SecureP@ss123',
   *   roleId: 2
   * });
   */
  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    this.logger.log(`Creating new user: ${createUserDto.email}`);

    // Check if the role exists
    const role = await this.roleRepository.findOne({
      where: { id: createUserDto.roleId },
    });
    if (!role) {
      this.logger.warn(`Role not found: ${createUserDto.roleId}`);
      throw new BadRequestException("Role does not exist");
    }

    // Check if the email or username already exists
    const exists = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }],
    });

    if (exists) {
      this.logger.warn(`Email already registered: ${createUserDto.email}`);
      throw new BadRequestException("Email or username already registered");
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user entity
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    this.logger.log(`User created successfully: ID=${savedUser.id}, email=${savedUser.email}`);

    // Return the saved user as a ResponseUserDto
    return plainToInstance(ResponseUserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Find a user by their email address
   * Includes role information in the result
   * 
   * @param email - User email address to search for
   * @returns Promise with user entity or null if not found
   */
  // Find a user by their email
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'], // Include role information
    });
  }

  /**
   * Get a user by their ID
   * Includes role information in the result
   * 
   * @param id - User ID to retrieve
   * @returns Promise with user response DTO
   * @throws {NotFoundException} If user not found
   */
  // Get a user by ID
  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Get all users with pagination
   * Returns users ordered by creation date (newest first)
   * 
   * @param paginationDto - Optional pagination parameters
   * @returns Promise with paginated response containing users and metadata
   */
  // Get all users
  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseUserDto>> {
    this.logger.log('Fetching all users with pagination');

    const { limit = 10, offset = 0 } = paginationDto || {};

    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['role'],
      order: { createdAt: 'DESC' },
    });

    const data = plainToInstance(ResponseUserDto, users, { excludeExtraneousValues: true });
    this.logger.log(`Returned ${data.length} users out of ${total} total`);

    return new PaginatedResponseDto(data, total, limit, offset);
  }

  // Update user information
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user data
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });

    // Return the updated user as a ResponseUserDto
    return plainToInstance(ResponseUserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  // Soft delete a user
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Soft delete the user (this doesn't remove from DB, just marks as deleted)
    await this.userRepository.softDelete(id);
  }
}
