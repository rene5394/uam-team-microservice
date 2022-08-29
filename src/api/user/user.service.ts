import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/common/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(status: string) {
    const keys = Object.keys(UserStatus);
    let statusId = 0;

    Object.keys(UserStatus).forEach(key => {
      if (key === status) {
        statusId = UserStatus[key];        
      }
    });

    if (statusId) {
      return await this.userRepository.find({ where : { status_id : statusId} });
    }

    return await this.userRepository.find();
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
