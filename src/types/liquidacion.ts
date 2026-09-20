// types/liquidacion.types.ts
export interface LiquidacionType {
  id: string;
  fecha: string;
  rutaId: string;
  esperado: number;
  efectivo: number;
  diferencia: number;
  credito: number;
  total: number;
  observacion: string;
}

export interface LiquidacionInput {
  fecha: string;
  rutaId: string;
  esperado: number;
  efectivo: number;
  credito: number;
  observacion?: string;
}

export interface LiquidacionFiltros {
  rutaId?: string;
  desde?: string;
  hasta?: string;
}

export type LiquidacionUpdate = Partial<Omit<LiquidacionType, 'id'>>;
