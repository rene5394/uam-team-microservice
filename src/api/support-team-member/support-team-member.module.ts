import { Module } from '@nestjs/common';
import { SupportTeamMemberService } from './support-team-member.service';
import { SupportTeamMemberController } from './support-team-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTeamMember } from './entities/support-team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportTeamMember])],
  controllers: [SupportTeamMemberController],
  providers: [SupportTeamMemberService]
})
export class SupportTeamMemberModule {}
