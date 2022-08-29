import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamStatus } from 'src/common/constants';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async findAll(status: string) {
    const keys = Object.keys(TeamStatus);
    let deactivated = null;

    Object.keys(TeamStatus).forEach(key => {
      if (key === status) {
        deactivated = TeamStatus[key];        
      }
    });

    if (deactivated !== null) {
      return await this.teamRepository.find({ where: { deactivated: deactivated} });
    }
    
    return await this.teamRepository.find();
  }

  async findOne(id: number) {
    return await this.teamRepository.findOne({ where: { id: id } });
  }
}
