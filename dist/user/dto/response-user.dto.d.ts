import { ResponseRoleDto } from "src/role/dto/response-role.dto";
export declare class ResponseUserDto {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    role: ResponseRoleDto;
    createdAt: Date;
    updatedAt: Date;
    roleId: number;
    password: string;
}
