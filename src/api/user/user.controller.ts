import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamService } from '../team/team.service';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService
  ) {}

  @MessagePattern('findAllUser')
  findAll(@Payload() findParams: any) {
    const { page, status } = findParams;

    return this.userService.findAll(page, status);
  }

  @MessagePattern('findAllUserEmployee')
  findAllEmployees(@Payload() findParams: any) {
    const { userIds, text, page, status } = findParams;
    
    return this.userService.findAllEmployees(text, page, status, userIds);
  }

  @MessagePattern('findAllUserEmployeeHireDate')
  findAllEmployeesByHireDate() {
    return this.userService.findAllEmployeesByHireDate();
  }

  @MessagePattern('findAllUserEmployeeSemesterHireDate')
  findAllEmployeesBySemesterHireDate() {
    return this.userService.findAllEmployeesBySemesterHireDate();
  }

  @MessagePattern('findAllUserEmployeeTeamId')
  findAllEmployeesByTeam(@Payload() findParams: any) {
    const { teamId, text, page, status } = findParams;
    
    return this.userService.findAllEmployeesByTeam(teamId, text, page, status);
  }

  @MessagePattern('findAllTeamUserEmployeeUserId')
  async findAllTeamEmployeesByUserId(@Payload() findParams: any) {
    const { userId, text, page, status } = findParams;
    const team = await this.teamService.findOneByUserId(userId);
    
    return await this.userService.findAllEmployeesByTeam(team.id, text, page, status);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }
}
