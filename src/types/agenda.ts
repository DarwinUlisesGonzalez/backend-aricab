// types/agenda.ts
import { Dia, Periodicidad, SemanaRef } from './asignacion';
import { ClienteProgramado } from './programacion';

export interface ProgramacionResuelta {
  id: string;
  nombre: string;
  clientes: ClienteProgramado[];
}

export interface AsignacionResuelta {
  id: string;
  dia: Dia;
  secuencia: number;
  periodicidad: Periodicidad;
  semanaRef: SemanaRef;
  programacion: ProgramacionResuelta;
}

export interface AsignacionesPorRutaResponse {
  rutaId: string;
  asignaciones: AsignacionResuelta[];
}