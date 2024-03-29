import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TODO_PRIORITIES } from 'src/helpers/todos.helper';

export class CreateTodoDto {
  @IsString({ message: 'title cannot be null' })
  title: string;

  @IsNumber()
  @IsNotEmpty({ message: 'activity_group_id cannot be null' })
  activity_group_id: number;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  @IsIn(Object.values(TODO_PRIORITIES))
  @IsOptional()
  priority: string;
}
