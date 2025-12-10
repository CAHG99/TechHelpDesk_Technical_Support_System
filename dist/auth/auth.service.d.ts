import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userService;
    private readonly jwt;
    private readonly config;
    private readonly roleRepository;
    private readonly logger;
    constructor(userService: UserService, jwt: JwtService, config: ConfigService, roleRepository: Repository<Role>);
    register(dto: RegisterDto): Promise<import("../user/dto/response-user.dto").ResponseUserDto>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    getProfile(userId: number): Promise<import("../user/dto/response-user.dto").ResponseUserDto>;
}
