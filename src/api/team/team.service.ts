import { Inject ,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamStatus } from 'src/common/constants';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { MemberService } from '../member/member.service';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
    @Inject(MemberService)
    private readonly memberService: MemberService
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

  async findOneByUserId(userId: number) {
    const employee = await this.employeeService.findOneByUserId(userId);
    const member = await this.memberService.findOneByEmployeeId(employee.id);

    return await this.teamRepository.findOne({ where: { id: member.team_id } });
  }

  async findOneByCoachUserId(userId: number) {    
    const employee = await this.employeeService.findOneByUserId(userId);
    
    return await this.teamRepository.findOne({ where: { employee_id: employee.id } });
  }  
}
