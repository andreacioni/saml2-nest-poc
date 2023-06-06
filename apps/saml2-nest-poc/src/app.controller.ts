import { JwtAuthGuard } from '@andreacioni/saml2-nest-lib/security/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { setInterval } from 'timers/promises';
import { MyLogger } from './logger/my-logger.service';

@Controller()
//@UseFilters(AllExceptionsFilter)
//@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly log: MyLogger) {}

  @Get()
  //@Header('Content-Type', 'application/json')
  async homepage() {
    await setInterval(100);
    this.log.warn!('dio di dio');
    //throw new InternalServerErrorException(null, 'dio bellissimo');
    await this.delay(1000);
    return { dio: 'di dio' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  async delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
