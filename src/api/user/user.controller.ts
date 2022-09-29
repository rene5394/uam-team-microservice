import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('findAllUser')
  findAll(@Payload() findParams: any) {
    const { page, status } = findParams;

    return this.userService.findAll(page, status);
  }

  @MessagePattern('findAllUserEmployee')
  findAllEmployees(@Payload() findParams: any) {
    const { text, page, status } = findParams;
    
    return this.userService.findAllEmployees(text, page, status);
  }

  @MessagePattern('findAllUserEmployeeTeamId')
  findAllEmployeesByTeam(@Payload() findParams: any) {
    const { teamId, text, page, status } = findParams;
    
    return this.userService.findAllEmployeesByTeam(teamId, text, page, status);
  }

  @MessagePattern('findAllTeamUserEmployeeUserId')
  findAllTeamEmployeesByUserId(@Payload() findParams: any) {
    const { userId, text, page, status } = findParams;
    
    return this.userService.findAllEmployeesByTeam(userId, text, page, status);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }
}
