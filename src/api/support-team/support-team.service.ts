import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTeam } from './entities/support-team.entity';

@Injectable()
export class SupportTeamService {
  constructor(
    @InjectRepository(SupportTeam)
    private readonly supportTeamRepository: Repository<SupportTeam>
  ) {}

  async findAll() {
    return await this.supportTeamRepository.find();
  }

  async findOne(id: number) {
    return await this.supportTeamRepository.findOne({ where: {id} });
  }
}
