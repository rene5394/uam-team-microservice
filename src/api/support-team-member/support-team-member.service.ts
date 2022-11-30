import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportTeamMemberStatus } from 'src/common/constants';
import { DataSource, Repository } from 'typeorm';
import { SupportTeamMember } from './entities/support-team-member.entity';

@Injectable()
export class SupportTeamMemberService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(SupportTeamMember)
    private readonly supportTeamMembersRepository: Repository<SupportTeamMember>
  ) {}
  
  async findAll(status: string) {
    const query = this.dataSource.getRepository(SupportTeamMember)
      .createQueryBuilder("support_teammembers");

    let activeStatusId = 0;

    Object.keys(SupportTeamMemberStatus).forEach(key => {
      if (key === status) {
        activeStatusId = SupportTeamMemberStatus[key];
      }
    });

    if (activeStatusId) {
      query.where("support_teammembers.active = :activeStatusId", { activeStatusId });
    }

    return await query.getMany();
  }

  async findBySupportTeamId(supportTeamId: number, status: string) {
    const query = this.dataSource.getRepository(SupportTeamMember)
      .createQueryBuilder("support_teammembers")
      .where("support_teammembers.support_team_id = :supportTeamId", { supportTeamId });

    let activeStatusId = 0;

    Object.keys(SupportTeamMemberStatus).forEach(key => {
      if (key === status) {
        activeStatusId = SupportTeamMemberStatus[key];
      }
    });

    if (activeStatusId) {
      query.andWhere("support_teammembers.active = :activeStatusId", { activeStatusId });
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.supportTeamMembersRepository.findOne({ where: { id } });
  }
}
