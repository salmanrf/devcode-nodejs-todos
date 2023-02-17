import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindTodosDto } from './dto/find-todo.dto';

@Controller('todo-items')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      const res = await this.todosService.create(createTodoDto);

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Query() findDto: FindTodosDto) {
    try {
      const res = await this.todosService.findAll(findDto);

      return res;
    } catch (error) {
      console.log('error["status"]', error['status']);

      throw error;
    }
  }

  @Get(':activity_id')
  async findOne(@Param('activity_id') activity_id: string) {
    try {
      const res = await this.todosService.findOne(+activity_id);

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':activity_id')
  async update(
    @Param('activity_id') activity_id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    try {
      const res = await this.todosService.update(+activity_id, updateTodoDto);

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':activity_id')
  async remove(@Param('activity_id') activity_id: string) {
    try {
      const res = await this.todosService.remove(+activity_id);

      return {};
    } catch (error) {
      throw error;
    }
  }
}
