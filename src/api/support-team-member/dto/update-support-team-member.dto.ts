import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportTeamMemberDto } from './create-support-team-member.dto';

export class UpdateSupportTeamMemberDto extends PartialType(CreateSupportTeamMemberDto) {
  id: number;
}
