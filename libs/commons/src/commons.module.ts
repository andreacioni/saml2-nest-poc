import { Module } from '@nestjs/common';
import { CommonsService } from './commons.service';

@Module({
  providers: [CommonsService],
  exports: [CommonsService],
})
export class CommonsModule {}
