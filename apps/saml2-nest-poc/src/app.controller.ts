import { Controller, UseGuards, Request, Get, Header } from '@nestjs/common';
import { resolve } from 'path';
import { JwtAuthGuard } from '@andreacioni/saml2-nest-lib/security/jwt-auth.guard';
import { readFile } from 'fs/promises';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  async homepage() {
    return readFile(resolve('web/index.html'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
