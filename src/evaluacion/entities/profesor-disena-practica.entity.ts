import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Profesor } from './profesor.entity';
import { Practica } from './practica.entity';

@Entity('profesor_disena_practica')
export class ProfesorDisenaPractica {
  @PrimaryColumn()
  id_profesor: number;

  @PrimaryColumn()
  id_practica: number;

  @Column({ type: 'date' })
  fecha: string;

  @ManyToOne(() => Profesor, profesor => profesor.disenaPracticas)
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  @ManyToOne(() => Practica, practica => practica.disenadaPor)
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
