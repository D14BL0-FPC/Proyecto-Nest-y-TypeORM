import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { AlumnoRealizaPractica } from './entities/alumno-realiza-practica.entity';
import { AlumnoHaceExamenTeorico } from './entities/alumno-hace-examen-teorico.entity';
import { CalificarPracticaDto, CalificarExamenDto } from './dto/evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
    @InjectRepository(AlumnoRealizaPractica)
    private practicaRepository: Repository<AlumnoRealizaPractica>,
    @InjectRepository(AlumnoHaceExamenTeorico)
    private examenRepository: Repository<AlumnoHaceExamenTeorico>,
  ) {}

  async calificarPractica(dto: CalificarPracticaDto) {
    const calificacion = this.practicaRepository.create(dto);
    return await this.practicaRepository.save(calificacion);
  }

  async calificarExamen(dto: CalificarExamenDto) {
    const calificacion = this.examenRepository.create(dto);
    return await this.examenRepository.save(calificacion);
  }

  async obtenerEvaluacionAlumno(idAlumno: number) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id: idAlumno },
      relations: ['realizaPracticas', 'realizaPracticas.practica', 'haceExamenes', 'haceExamenes.examen'],
    });

    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${idAlumno} no encontrado`);
    }

    return alumno;
  }
}
