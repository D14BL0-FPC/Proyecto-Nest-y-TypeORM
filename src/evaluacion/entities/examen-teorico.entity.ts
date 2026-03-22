import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profesor } from './profesor.entity';
import { AlumnoHaceExamenTeorico } from './alumno-hace-examen-teorico.entity';

@Entity('examenes_teoricos')
export class ExamenTeorico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  numero_preguntas: number;

  @Column({ type: 'date' })
  fecha: string;

  @ManyToOne(() => Profesor, profesor => profesor.disenaExamenes)
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  @OneToMany(() => AlumnoHaceExamenTeorico, ahe => ahe.examen)
  hechoPor: AlumnoHaceExamenTeorico[];
}
