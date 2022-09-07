import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern('createMember')
  create(@Payload() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @MessagePattern('findAllMember')
  findAll() {
    return this.memberService.findAll();
  }

  @MessagePattern('findOneMember')
  findOne(@Payload() id: number) {
    return this.memberService.findOne(id);
  }

  @MessagePattern('updateMember')
  update(@Payload() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(updateMemberDto.id, updateMemberDto);
  }

  @MessagePattern('removeMember')
  remove(@Payload() id: number) {
    return this.memberService.remove(id);
  }
}
