import { Test, TestingModule } from '@nestjs/testing';
import { SupportTeamService } from './support-team.service';

describe('SupportTeamService', () => {
  let service: SupportTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportTeamService],
    }).compile();

    service = module.get<SupportTeamService>(SupportTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
