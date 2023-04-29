import { Test, TestingModule } from '@nestjs/testing';
import { CommonsService } from './commons.service';

describe('CommonsService', () => {
  let service: CommonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonsService],
    }).compile();

    service = module.get<CommonsService>(CommonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
