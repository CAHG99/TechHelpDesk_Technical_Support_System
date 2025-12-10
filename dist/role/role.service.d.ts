import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ResponseRoleDto } from "./dto/response-role.dto";
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
export declare class RoleService {
    private readonly roleRepository;
    private readonly logger;
    constructor(roleRepository: Repository<Role>);
    create(dto: CreateRoleDto): Promise<ResponseRoleDto>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<ResponseRoleDto>>;
    findOne(id: number): Promise<ResponseRoleDto>;
    findByName(name: string): Promise<Role | null>;
    update(id: number, dto: UpdateRoleDto): Promise<ResponseRoleDto>;
    remove(id: number): Promise<void>;
}
