import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationLimit } from 'src/common/constants';
import { DataSource, Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  async findAll(employeeIds: any[]): Promise<Member[]> {
    const query = this.dataSource.getRepository(Member)
    .createQueryBuilder("teammembers");

    if (employeeIds) {
      query.where("teammembers.employee_id IN (:employeeIds)", { employeeIds });
    }

    return await query.getMany();
  }

  async findAllByTeamId(teamId: number): Promise<Member[]> {
    return await this.memberRepository.find({ where: { team_id: teamId } });
  }

  async findOne(id: number) {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async findOneByEmployeeId(employeeId: number) {
    return await this.memberRepository.findOne({ where: { employee_id: employeeId } });
  }
}
