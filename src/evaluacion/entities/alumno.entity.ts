import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from './alumno-realiza-practica.entity';
import { AlumnoHaceExamenTeorico } from './alumno-hace-examen-teorico.entity';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nif: string;

  @Column()
  grupo: string;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column({ nullable: true })
  apellido2: string;

  @OneToMany(() => AlumnoRealizaPractica, arp => arp.alumno)
  realizaPracticas: AlumnoRealizaPractica[];

  @OneToMany(() => AlumnoHaceExamenTeorico, ahe => ahe.alumno)
  haceExamenes: AlumnoHaceExamenTeorico[];
}
