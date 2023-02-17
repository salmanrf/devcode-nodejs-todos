import { TODO_PRIORITIES } from 'src/helpers/todos.helper';
import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  activity_group_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    default: TODO_PRIORITIES.VERY_HIGH,
  })
  @Check(`priority IN (${Object.values(TODO_PRIORITIES).toString()})`)
  priority: string;

  @Column({
    type: 'bool',
    nullable: false,
    default: true,
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;

  @DeleteDateColumn()
  deleted_at: Date | string;
}
