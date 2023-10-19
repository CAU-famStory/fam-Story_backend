import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';

@Entity('family_schedule', { schema: 'family_app_db' })
export class FamilySchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Family_ID' })
  familyId: number;

  @Column('varchar', { name: 'Schedule_Name', nullable: false, length: 50 })
  scheduleName: string;

  @Column('date', { name: 'Schedule_Date', nullable: false })
  scheduleDate: string;

  @ManyToOne(() => Family, (family) => family.familySchedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;
}