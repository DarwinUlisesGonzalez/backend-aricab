// types/asignacion.types.ts
export type Dia = 'Dom' | 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab';
export type Periodicidad = 'semanal' | 'quincenal';
export type SemanaRef = 'par' | 'impar' | null;

export interface AsignacionType {
  id: string;
  programacionId: string;
  rutaId: string;
  dia: Dia;
  secuencia: number;
  periodicidad: Periodicidad;
  semanaRef: SemanaRef;
  activo: boolean;
}

export type AsignacionUpdate = Partial<Omit<AsignacionType, 'id'>>;