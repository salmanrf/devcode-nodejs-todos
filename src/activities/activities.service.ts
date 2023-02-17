import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const newActivity = await this.activityRepo.save(createActivityDto);

      return newActivity;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const actQb = this.activityRepo.createQueryBuilder('a');

      actQb.orderBy('activity_id', 'ASC');

      const activities = await actQb.getMany();

      return activities;
    } catch (error) {
      throw error;
    }
  }

  async findOne(activity_id: number) {
    try {
      const activity = await this.activityRepo.findOne({
        where: { activity_id },
      });

      if (!activity) {
        throw new NotFoundException(
          `Activity with ID ${activity_id} Not Found`,
        );
      }

      return activity;
    } catch (error) {
      throw error;
    }
  }

  async update(activity_id: number, updateActivityDto: UpdateActivityDto) {
    try {
      const {
        activity_id: _,
        created_at,
        updated_at,
        deleted_at,
        ...updates
      } = updateActivityDto as Activity;

      let activity = await this.activityRepo.findOne({
        where: { activity_id },
      });

      if (!activity) {
        throw new NotFoundException(
          `Activity with ID ${activity_id} Not Found`,
        );
      }

      activity = await this.activityRepo.save(
        { ...activity, ...updates },
        { reload: true },
      );

      return activity;
    } catch (error) {
      throw error;
    }
  }

  async remove(activity_id: number) {
    try {
      const activity = await this.activityRepo.findOne({
        where: { activity_id },
      });

      if (!activity) {
        throw new NotFoundException(
          `Activity with ID ${activity_id} Not Found`,
        );
      }

      await this.activityRepo.delete({ activity_id });

      return activity;
    } catch (error) {
      throw error;
    }
  }
}
