import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern('findAllMember')
  findAll(@Payload() findParams: any) {
    const { employeeIds } = findParams;

    return this.memberService.findAll(employeeIds);
  }

  @MessagePattern('findOneMember')
  findOne(@Payload() id: number) {
    return this.memberService.findOne(id);
  }
}
