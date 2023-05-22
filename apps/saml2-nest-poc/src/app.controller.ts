import { JwtAuthGuard } from '@andreacioni/saml2-nest-lib/security/jwt-auth.guard';
import {
  Controller,
  Get,
  Request,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import express from 'express';
import { resolve } from 'path';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { MyLogger } from './logger/my-logger.service';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly log: MyLogger) {}

  @Get()
  async homepage(@Response() res: express.Response) {
    this.log.log('prova');
    res.sendFile(resolve('web/index.html'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
