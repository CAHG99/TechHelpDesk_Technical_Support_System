import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(dto: CreateRoleDto): Promise<ResponseRoleDto>;
    findAll(): Promise<import("../common/dto/paginated-response.dto").PaginatedResponseDto<ResponseRoleDto>>;
    findOne(id: number): Promise<ResponseRoleDto>;
    update(id: number, dto: UpdateRoleDto): Promise<ResponseRoleDto>;
    remove(id: number): Promise<void>;
}
