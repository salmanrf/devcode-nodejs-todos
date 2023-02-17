import {
  IsBooleanString,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { TODO_PRIORITIES } from 'src/helpers/todos.helper';

export class FindTodosDto {
  @IsString({ message: 'title cannot be null' })
  @IsOptional()
  title?: string;

  @IsNumberString()
  @IsOptional()
  activity_group_id?: number;

  @IsString()
  @IsIn(Object.values(TODO_PRIORITIES))
  @IsOptional()
  priority?: string;

  @IsBooleanString()
  @IsOptional()
  is_active: boolean;
}
