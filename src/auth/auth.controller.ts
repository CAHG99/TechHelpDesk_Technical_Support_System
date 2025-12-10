import { Controller, Post, Body, UseGuards, Req, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from '../common/decorators/get-user.decorator';
import type { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: RegisterDto })
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiBody({ type: LoginDto })
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@GetUser() user: JwtPayload) {
    return this.authService.getProfile(user.sub);
  }
}
