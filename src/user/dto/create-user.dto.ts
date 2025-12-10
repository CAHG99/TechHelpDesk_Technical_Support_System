import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'juan.perez@empresa.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña segura (mín 8 chars, mayúscula, minúscula, número, especial)',
    example: 'MiPassword@123',
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)',
    },
  )
  password: string;

  @ApiProperty({
    description: 'ID del rol asignado al usuario',
    example: 1,
  })
  @IsNumber()
  roleId: number;
}
