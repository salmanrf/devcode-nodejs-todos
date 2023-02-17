import { IsString } from 'class-validator';

export class FindActivityDto {
  @IsString({ message: 'title cannot be null' })
  title: string;

  @IsString({ message: 'email cannot be null' })
  email: string;
}
