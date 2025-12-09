import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ResponseRoleDto } from "src/role/dto/response-role.dto";

export class ResponseUserDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()   
    email: string;

    @Expose()  
    isActive: boolean;

    @Expose()
    @Transform(({ obj }) => obj.role?.name)
    role: ResponseRoleDto;

    @Expose()
    @Transform(({value}) => value ? new Date(value).toLocaleDateString('es-CO'):null)
    createdAt: Date;

    @Expose()
    @Transform(({value}) => value ? new Date(value).toLocaleDateString('es-CO'):null)
    updatedAt: Date;

    @Exclude()
    roleId: number;

    @Exclude()
    password: string;
}
