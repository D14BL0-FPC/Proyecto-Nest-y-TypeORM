import { IsNumber, IsDateString, Min, Max } from 'class-validator';

export class CalificarPracticaDto {
  @IsNumber()
  id_alumno: number;

  @IsNumber()
  id_practica: number;

  @IsDateString()
  fecha: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  nota: number;
}

export class CalificarExamenDto {
  @IsNumber()
  id_alumno: number;

  @IsNumber()
  id_examen_teorico: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  nota: number;
}
