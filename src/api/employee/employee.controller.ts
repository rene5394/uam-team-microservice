import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern('findAllEmployee')
  findAll() {
    return this.employeeService.findAll();
  }

  @MessagePattern('findOneEmployee')
  findOne(@Payload() id: number) {
    return this.employeeService.findOne(id);
  }
}
