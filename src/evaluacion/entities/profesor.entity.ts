import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExamenTeorico } from './examen-teorico.entity';
import { ProfesorDisenaPractica } from './profesor-disena-practica.entity';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nif: string;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column({ nullable: true })
  apellido2: string;

  @OneToMany(() => ExamenTeorico, examen => examen.profesor)
  disenaExamenes: ExamenTeorico[];

  @OneToMany(() => ProfesorDisenaPractica, pdp => pdp.profesor)
  disenaPracticas: ProfesorDisenaPractica[];
}
