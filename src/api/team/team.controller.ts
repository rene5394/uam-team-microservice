import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamService } from './team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @MessagePattern('findAllTeam')
  findAll(@Payload() status: string) {    
    return this.teamService.findAll(status);
  }

  @MessagePattern('findOneTeam')
  findOne(@Payload() id: number) {
    return this.teamService.findOne(id);
  }

  @MessagePattern('findOneTeamUserid')
  findOneByUserJWT(@Payload() id: number) {
    return this.teamService.findOne(id);
  }
}
