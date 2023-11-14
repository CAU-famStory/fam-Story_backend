import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyScheduleDto } from './create-family-schedule.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFamilyScheduleDto extends PartialType(
  CreateFamilyScheduleDto,
) {
  @IsNotEmpty()
  @IsNumber()
  readonly familyScheduleId: number;

  @IsNotEmpty()
  @IsString()
  readonly scheduleName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @IsNotEmpty()
  @IsDate()
  readonly scheduleDate: Date;
}
