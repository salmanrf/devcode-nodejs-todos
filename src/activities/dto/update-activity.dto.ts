import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends CreateActivityDto {
  @IsString({ message: 'email cannot be null' })
  @IsOptional()
  email: string;
}
