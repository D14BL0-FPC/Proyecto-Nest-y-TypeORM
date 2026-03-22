import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';
import { Alumno } from './entities/alumno.entity';
import { Practica } from './entities/practica.entity';
import { Profesor } from './entities/profesor.entity';
import { ExamenTeorico } from './entities/examen-teorico.entity';
import { AlumnoRealizaPractica } from './entities/alumno-realiza-practica.entity';
import { AlumnoHaceExamenTeorico } from './entities/alumno-hace-examen-teorico.entity';
import { ProfesorDisenaPractica } from './entities/profesor-disena-practica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Alumno,
      Practica,
      Profesor,
      ExamenTeorico,
      AlumnoRealizaPractica,
      AlumnoHaceExamenTeorico,
      ProfesorDisenaPractica,
    ]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}
