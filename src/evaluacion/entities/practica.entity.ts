import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from './alumno-realiza-practica.entity';
import { ProfesorDisenaPractica } from './profesor-disena-practica.entity';

@Entity('practicas')
export class Practica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  dificultad: string;

  @OneToMany(() => AlumnoRealizaPractica, arp => arp.practica)
  realizadaPor: AlumnoRealizaPractica[];

  @OneToMany(() => ProfesorDisenaPractica, pdp => pdp.practica)
  disenadaPor: ProfesorDisenaPractica[];
}
