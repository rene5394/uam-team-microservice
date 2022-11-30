import { Module } from '@nestjs/common';
import { SupportTeamService } from './support-team.service';
import { SupportTeamController } from './support-team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTeam } from './entities/support-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportTeam])],
  controllers: [SupportTeamController],
  providers: [SupportTeamService]
})
export class SupportTeamModule {}
