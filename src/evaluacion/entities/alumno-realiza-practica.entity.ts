import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Alumno } from './alumno.entity';
import { Practica } from './practica.entity';

@Entity('alumno_realiza_practica')
export class AlumnoRealizaPractica {
  @PrimaryColumn()
  id_alumno: number;

  @PrimaryColumn()
  id_practica: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  nota: number;

  @ManyToOne(() => Alumno, alumno => alumno.realizaPracticas)
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  @ManyToOne(() => Practica, practica => practica.realizadaPor)
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
