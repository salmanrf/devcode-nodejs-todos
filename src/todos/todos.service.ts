import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindTodosDto } from './dto/find-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const newTodo = await this.todoRepo.save(createTodoDto);

      return newTodo;
    } catch (error) {
      throw error;
    }
  }

  async findAll(findDto: FindTodosDto) {
    try {
      const { activity_group_id, priority, title, is_active } = findDto;

      const todoQb = this.todoRepo.createQueryBuilder('t');

      if (activity_group_id) {
        todoQb.andWhere({ activity_group_id });
      }

      if (priority) {
        todoQb.andWhere({ priority });
      }

      if (title) {
        todoQb.andWhere('title ILIKE :title', { title: `%${title}%` });
      }

      if (is_active != null) {
        todoQb.andWhere({ is_active });
      }

      todoQb.orderBy('id', 'ASC');

      const todos = await todoQb.getMany();

      return todos;
    } catch (error) {
      return error;
    }
  }

  async findOne(todo_id: number) {
    try {
      const todo = await this.todoRepo.findOne({ where: { id: todo_id } });

      if (!todo) {
        throw new NotFoundException(`Todo with ID ${todo_id} Not Found`);
      }

      return todo;
    } catch (error) {
      throw error;
    }
  }

  async update(todo_id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const { activity_group_id, is_active, priority, title } = updateTodoDto;

      let todo = await this.todoRepo.findOne({ where: { id: todo_id } });

      if (!todo) {
        throw new NotFoundException(`Todo with ID ${todo_id} Not Found`);
      }

      if (activity_group_id) {
        todo.activity_group_id = activity_group_id;
      }

      if (is_active != null) {
        todo.is_active = is_active;
      }

      if (priority) {
        todo.priority = priority;
      }

      if (title) {
        todo.title = title;
      }

      todo = await this.todoRepo.save(todo);

      return todo;
    } catch (error) {
      throw error;
    }
  }

  async remove(todo_id: number) {
    try {
      const todo = await this.todoRepo.findOne({
        where: { id: todo_id },
      });

      if (!todo) {
        throw new NotFoundException(`Todo with ID ${todo_id} Not Found`);
      }

      await this.todoRepo.delete({ id: todo_id });

      return todo;
    } catch (error) {
      throw error;
    }
  }
}
