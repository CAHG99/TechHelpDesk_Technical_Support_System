import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResponseUserDto } from "./dto/response-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "src/role/entities/role.entity";
import { PaginationDto } from "../common/dto/pagination.dto";
import { PaginatedResponseDto } from "../common/dto/paginated-response.dto";
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    create(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    findByEmail(email: string): Promise<User | null>;
    findOne(id: number): Promise<ResponseUserDto>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseUserDto>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto>;
    remove(id: number): Promise<void>;
}
