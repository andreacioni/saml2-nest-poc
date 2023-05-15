import { Controller, UseGuards, Request, Get, Response } from '@nestjs/common';
import { resolve } from 'path';
import express from 'express';
import { JwtAuthGuard } from '@andreacioni/saml2-nest-lib/lib/security/jwt-auth.guard';

@Controller()
export class AppController {
  @Get()
  async homepage(@Response() res: express.Response) {
    res.sendFile(resolve('web/index.html'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
