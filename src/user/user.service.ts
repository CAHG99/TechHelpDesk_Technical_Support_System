import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    // Check if the role exists
    const role = await this.roleRepository.findOne({ where: { id: createUserDto.roleId } });
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

    // Check if the email or username already exists
    const exists = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }],
    });

    if (exists) {
      throw new BadRequestException('Email or username already registered');
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

    // Return the saved user as a ResponseUserDto
    return plainToInstance(ResponseUserDto, savedUser, { excludeExtraneousValues: true });
  }

  // Find a user by their email
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'], // Include role information
    });
  }

  // Get a user by ID
  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user, { excludeExtraneousValues: true });
  }

  // Get all users
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(ResponseUserDto, users, { excludeExtraneousValues: true });
  }

  // Update user information
  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user data
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });

    // Return the updated user as a ResponseUserDto
    return plainToInstance(ResponseUserDto, updatedUser, { excludeExtraneousValues: true });
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
