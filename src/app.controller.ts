import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoggedInGuard } from './auth/logged-in.guard';
import { SamlAuthGuard } from './auth/saml-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('auth/saml/login')
  @UseGuards(SamlAuthGuard)
  async samlLogin() {
    return;
  }

  @Post('auth/saml/ac')
  @Redirect('/is_authenticated')
  @UseGuards(SamlAuthGuard)
  async samlAssertionConsumer() {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('is_authenticated')
  @UseGuards(LoggedInGuard)
  isAuthenticated(@Request() req: any) {
    return req.user;
  }
}
