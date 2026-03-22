import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Alumno } from './alumno.entity';
import { ExamenTeorico } from './examen-teorico.entity';

@Entity('alumno_hace_examen_teorico')
export class AlumnoHaceExamenTeorico {
  @PrimaryColumn()
  id_alumno: number;

  @PrimaryColumn()
  id_examen_teorico: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  nota: number;

  @ManyToOne(() => Alumno, alumno => alumno.haceExamenes)
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  @ManyToOne(() => ExamenTeorico, examen => examen.hechoPor)
  @JoinColumn({ name: 'id_examen_teorico' })
  examen: ExamenTeorico;
}
