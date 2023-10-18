import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IndividualScheduleService } from '../service/individual-schedule.service';
import { CreateIndividualScheduleDto } from '../dto/request/create-individual-schedule.dto';
import { UpdateIndividualScheduleDto } from '../dto/request/update-individual-schedule.dto';

@Controller('individual-schedule')
export class IndividualScheduleController {
  constructor(
    private readonly individualScheduleService: IndividualScheduleService,
  ) {}

  @Post()
  create(@Body() createIndividualScheduleDto: CreateIndividualScheduleDto) {
    return this.individualScheduleService.create(createIndividualScheduleDto);
  }

  @Get()
  findAll() {
    return this.individualScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndividualScheduleDto: UpdateIndividualScheduleDto,
  ) {
    return this.individualScheduleService.update(
      +id,
      updateIndividualScheduleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.individualScheduleService.remove(+id);
  }
}