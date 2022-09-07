import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: number) {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async findOneByEmployeeId(employeeId: number) {
    return await this.memberRepository.findOne({ where: { employee_id: employeeId } });
  }
}
