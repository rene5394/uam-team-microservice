import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './api/user/user.module';
import { TeamModule } from './api/team/team.module';
import { EmployeeModule } from './api/employee/employee.module';
import { MemberModule } from './api/member/member.module';
import { SupportTeamModule } from './api/support-team/support-team.module';
import { SupportTeamMemberModule } from './api/support-team-member/support-team-member.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any || 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username  : process.env.DATABASE_USERNAME || 'root',
      password  : process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE || 'uamapp',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
      extra : {
        connectionLimit: 100
      }
    }),
    UserModule,
    TeamModule,
    EmployeeModule,
    MemberModule,
    SupportTeamModule,
    SupportTeamMemberModule,
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
