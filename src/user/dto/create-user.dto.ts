import { IsEmail, IsString, MinLength, MaxLength, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNumber()
    roleId: number;   
}
