import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('increment')
  todo_id: number;

  @Column({ type: 'int', nullable: false })
  activity_group_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  priority: string;

  @CreateDateColumn()
  created_at: Date | string;
}
