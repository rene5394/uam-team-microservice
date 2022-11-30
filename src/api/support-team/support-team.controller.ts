import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupportTeamService } from './support-team.service';

@Controller()
export class SupportTeamController {
  constructor(private readonly supportTeamService: SupportTeamService) {}

  @MessagePattern('findAllSupportTeam')
  findAll() {
    return this.supportTeamService.findAll();
  }

  @MessagePattern('findOneSupportTeam')
  findOne(@Payload() id: number) {
    return this.supportTeamService.findOne(id);
  }
}
