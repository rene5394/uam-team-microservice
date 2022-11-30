import { Test, TestingModule } from '@nestjs/testing';
import { SupportTeamMemberService } from './support-team-member.service';

describe('SupportTeamMemberService', () => {
  let service: SupportTeamMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportTeamMemberService],
    }).compile();

    service = module.get<SupportTeamMemberService>(SupportTeamMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
