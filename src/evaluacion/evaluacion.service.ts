import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { Practica } from './entities/practica.entity';
import { Profesor } from './entities/profesor.entity';
import { ExamenTeorico } from './entities/examen-teorico.entity';
import { AlumnoRealizaPractica } from './entities/alumno-realiza-practica.entity';
import { AlumnoHaceExamenTeorico } from './entities/alumno-hace-examen-teorico.entity';
import { ProfesorDisenaPractica } from './entities/profesor-disena-practica.entity';
import { CalificarPracticaDto, CalificarExamenDto } from './dto/evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Practica) private practicaRepository: Repository<Practica>,
    @InjectRepository(Profesor) private profesorRepository: Repository<Profesor>,
    @InjectRepository(ExamenTeorico) private examenModelRepository: Repository<ExamenTeorico>,
    @InjectRepository(AlumnoRealizaPractica) private evalPracticaRepository: Repository<AlumnoRealizaPractica>,
    @InjectRepository(AlumnoHaceExamenTeorico) private evalExamenRepository: Repository<AlumnoHaceExamenTeorico>,
    @InjectRepository(ProfesorDisenaPractica) private profDisenaPracticaRepository: Repository<ProfesorDisenaPractica>,
  ) {}

  async calificarPractica(dto: CalificarPracticaDto) {
    const calificacion = this.evalPracticaRepository.create(dto);
    return await this.evalPracticaRepository.save(calificacion);
  }

  async calificarExamen(dto: CalificarExamenDto) {
    const calificacion = this.evalExamenRepository.create(dto);
    return await this.evalExamenRepository.save(calificacion);
  }

  async obtenerEvaluacionAlumno(idAlumno: number) {
    const alumno = await this.alumnoRepository.findOne({
      where: { id: idAlumno },
      relations: ['realizaPracticas', 'realizaPracticas.practica', 'haceExamenes', 'haceExamenes.examen'],
    });

    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${idAlumno} no encontrado`);
    }

    return alumno; // Automatically formats with nested evaluated practicas and examenes
  }

  async seedData() {
    // Basic seeder to make demo video testing easier
    const alumno = await this.alumnoRepository.save({ nif: '12345678A', grupo: 'A', nombre: 'Juan', apellido1: 'Perez', apellido2: 'Gomez' });
    const profesor = await this.profesorRepository.save({ nif: '87654321B', nombre: 'Prof. Carlos', apellido1: 'Lopez', apellido2: 'Garcia' });
    const practica = await this.practicaRepository.save({ titulo: 'NestJS TypeORM', dificultad: 'Alta' });
    const examen = await this.examenModelRepository.save({ titulo: 'Examen Final IAW', numero_preguntas: 10, fecha: new Date().toISOString().split('T')[0], profesor });
    
    await this.profDisenaPracticaRepository.save({ id_profesor: profesor.id, id_practica: practica.id, fecha: new Date().toISOString().split('T')[0] });

    return { message: 'Base de datos poblada con datos de prueba genéricos.', alumno, profesor, practica, examen };
  }
}
