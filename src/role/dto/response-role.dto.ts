// src/role/dto/response-role.dto.ts
import { Expose } from "class-transformer";

export class ResponseRoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
