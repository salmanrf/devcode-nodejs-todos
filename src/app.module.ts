import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { TodosModule } from './todos/todos.module';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'salmanrf',
      password: 'levitation123',
      database: 'todos',
      port: 3307,
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ActivitiesModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
