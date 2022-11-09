import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/common/constants';
import { Brackets, createQueryBuilder, DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { paginationLimit } from 'src/common/constants';
import { Employee } from '../employee/entities/employee.entity';
import { Member } from '../member/entities/member.entity';
import { Team } from '../team/entities/team.entity';
import { getSemesterHiredates, getYearlyHiredates } from 'src/common/utils/timeValidation';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(page: number, status: string) {
    const query = this.dataSource.getRepository(User)
      .createQueryBuilder("users");

    let statusId = 0;

    Object.keys(UserStatus).forEach(key => {
      if (key === status) {
        statusId = UserStatus[key];
      }
    });

    if (statusId) {
      query.where("users.status_id = :statusId", { statusId });
    }

    if (page) {
      query
        .skip((page -1) * paginationLimit.users)
        .take(paginationLimit.users);
    }

    return await query.getMany();
  }

  async findAllEmployees(text: string, page: number, status: string, userIds: any[]) {
    const query = this.dataSource.getRepository(User)
      .createQueryBuilder("users")
      .innerJoin(Employee, "employees", "employees.user_id = users.id");

    let statusId = 0;

    Object.keys(UserStatus).forEach(key => {
      if (key === status) {
        statusId = UserStatus[key];
      }
    });

    if (statusId) {
      query.where("users.status_id = :statusId", { statusId });
    }

    if (userIds) {
      query.andWhere("users.id IN (:userIds)", { userIds });
    }

    if (text) {
      query.andWhere(new Brackets(qb => {
        qb.andWhere("users.firstname like :name", { name:`${text}%` })
        .orWhere("users.secondname like :name", { name:`${text}%` })
        .orWhere("users.lastname like :name", { name:`${text}%` })
        .orWhere("users.secondlastname like :name", { name:`${text}%` });;
      }));
    }

    if (page) {
      query
        .skip((page -1) * paginationLimit.users)
        .take(paginationLimit.users);
    }

    const [list, count] = await Promise.all([
      query.getMany(),
      query.getCount()
    ]);

    return { list, count };
  }

  async findAllEmployeesByHireDate() {
    const hireDates = getYearlyHiredates();
    const statusId = UserStatus.active;
  
    const query = this.dataSource.getRepository(User)
      .createQueryBuilder("users")
      .innerJoin(Employee, "employees", "employees.user_id = users.id")
      .where("users.status_id = :statusId", { statusId })
      .andWhere("users.hiredate IN (:hireDates)", { hireDates });

    return query.getMany();
  }

  async findAllEmployeesBySemesterHireDate() {
    const hireDates = getSemesterHiredates();
    const statusId = UserStatus.active;
  
    const query = this.dataSource.getRepository(User)
      .createQueryBuilder("users")
      .innerJoin(Employee, "employees", "employees.user_id = users.id")
      .where("users.status_id = :statusId", { statusId })
      .andWhere("users.hiredate IN (:hireDates)", { hireDates });

    return query.getMany();
  }

  async findAllEmployeesByTeam(teamId: number, text: string, page: number, status: string) {
    const query = this.dataSource.getRepository(User)
      .createQueryBuilder("users")
      .innerJoin(Employee, "employees", "employees.user_id = users.id")
      .innerJoin(Member, "members", "members.employee_id = employees.id")
      .where("members.team_id = :teamId", { teamId });

    let statusId = 0;

    Object.keys(UserStatus).forEach(key => {
      if (key === status) {
        statusId = UserStatus[key];
      }
    });

    if (statusId) {
      query.andWhere("users.status_id = :statusId", { statusId });
    }

    if (text) {
      query.andWhere(new Brackets(qb => {
        qb.andWhere("users.firstname like :name", { name:`${text}%` })
        .orWhere("users.secondname like :name", { name:`${text}%` })
        .orWhere("users.lastname like :name", { name:`${text}%` })
        .orWhere("users.secondlastname like :name", { name:`${text}%` });;
      }));
    }

    if (page) {
      query
        .skip((page -1) * paginationLimit.users)
        .take(paginationLimit.users);
    }

    const [list, count] = await Promise.all([
      query.getMany(),
      query.getCount()
    ]);

    return { list, count };
  }
 
  async findOne(id: number) {
    return await this.userRepository.findOne({
        relations: {
            images: true,
        },
        where: { id }
    });
  }
}
