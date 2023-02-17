import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { TodosModule } from './todos/todos.module';
import { DB_CONFIG } from './configs/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_CONFIG.MYSQL_HOST,
      username: DB_CONFIG.MYSQL_USER,
      password: DB_CONFIG.MYSQL_PASSWORD,
      database: DB_CONFIG.MYSQL_DBNAME,
      port: +DB_CONFIG.MYSQL_PORT,
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
    }),
    ActivitiesModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
