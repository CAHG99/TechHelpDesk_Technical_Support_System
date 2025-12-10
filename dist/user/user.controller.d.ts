import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResponseUserDto } from "./dto/response-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    findAll(): Promise<import("../common/dto/paginated-response.dto").PaginatedResponseDto<ResponseUserDto>>;
    findOne(id: number): Promise<ResponseUserDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto>;
    remove(id: number): Promise<void>;
}
