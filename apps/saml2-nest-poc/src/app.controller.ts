import { JwtAuthGuard } from '@andreacioni/saml2-nest-lib/security/jwt-auth.guard';
import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import express from 'express';
import { setInterval } from 'timers/promises';
import { MyLogger } from './logger/my-logger.service';

@Controller()
//@UseFilters(AllExceptionsFilter)
//@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly log: MyLogger) {}

  @Get()
  async homepage(@Response() res: express.Response) {
    await setInterval(100);
    this.log.warn!('dio di dio');
    throw new Error('dio bellissimo');
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
