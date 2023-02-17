import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity-groups')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    try {
      const res = await this.activitiesService.create(createActivityDto);

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const res = await this.activitiesService.findAll();

      return res;
    } catch (error) {
      console.log('error["status"]', error['status']);

      throw error;
    }
  }

  @Get(':activity_id')
  async findOne(@Param('activity_id') activity_id: string) {
    try {
      const res = await this.activitiesService.findOne(+activity_id);

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':activity_id')
  async update(
    @Param('activity_id') activity_id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      const res = await this.activitiesService.update(
        +activity_id,
        updateActivityDto,
      );

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':activity_id')
  async remove(@Param('activity_id') activity_id: string) {
    try {
      const res = await this.activitiesService.remove(+activity_id);

      return {};
    } catch (error) {
      throw error;
    }
  }
}
