import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupportTeamMemberService } from './support-team-member.service';

@Controller()
export class SupportTeamMemberController {
  constructor(private readonly supportTeamMemberService: SupportTeamMemberService) {}
  
  @MessagePattern('findAllSupportTeamMember')
  findAll(@Payload() findParams: any) {
    const { status } = findParams;

    return this.supportTeamMemberService.findAll(status);
  }

  @MessagePattern('findAllSupportTeamMemberSupportTeamId')
  findBySupportTeamId(@Payload() findParams: any) {
    const { supportTeamId, status } = findParams;
    
    return this.supportTeamMemberService.findBySupportTeamId(supportTeamId, status);
  }

  @MessagePattern('findOneSupportTeamMember')
  findOne(@Payload() id: number) {
    return this.supportTeamMemberService.findOne(id);
  }
}
