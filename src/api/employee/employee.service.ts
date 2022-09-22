import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationLimit } from 'src/common/constants';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async findAll(userIds: any[]): Promise<Employee[]> {
    const query = this.dataSource.getRepository(Employee)
    .createQueryBuilder("employees");

    if (userIds) {
      query.where("employees.user_id IN (:userIds)", { userIds });
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async findOneByUserId(userId: number) {
    return await this.employeeRepository.findOne({ where: { user_id: userId } });
  }
}
