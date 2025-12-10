import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import type { JwtPayload } from '../common/interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("../user/dto/response-user.dto").ResponseUserDto>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    getProfile(user: JwtPayload): Promise<import("../user/dto/response-user.dto").ResponseUserDto>;
}
