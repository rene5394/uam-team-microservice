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
    const { page, status } = findParams;
    
    return this.userService.findAllEmployees(page, status);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }
}
