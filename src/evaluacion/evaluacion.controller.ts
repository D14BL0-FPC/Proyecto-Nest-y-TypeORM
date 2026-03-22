import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CalificarPracticaDto, CalificarExamenDto } from './dto/evaluacion.dto';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post('practica')
  calificarPractica(@Body() dto: CalificarPracticaDto) {
    return this.evaluacionService.calificarPractica(dto);
  }

  @Post('examen')
  calificarExamen(@Body() dto: CalificarExamenDto) {
    return this.evaluacionService.calificarExamen(dto);
  }

  @Get('alumno/:id')
  obtenerEvaluacionAlumno(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionService.obtenerEvaluacionAlumno(id);
  }
}
