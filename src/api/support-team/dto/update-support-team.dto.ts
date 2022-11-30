import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportTeamDto } from './create-support-team.dto';

export class UpdateSupportTeamDto extends PartialType(CreateSupportTeamDto) {
  id: number;
}
