import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern('findAllMember')
  findAll() {
    return this.memberService.findAll();
  }

  @MessagePattern('findOneMember')
  findOne(@Payload() id: number) {
    return this.memberService.findOne(id);
  }
}
