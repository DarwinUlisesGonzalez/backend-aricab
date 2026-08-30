// types/programacion.types.ts
export interface ClienteProgramado {
  clienteId: string;
  orden: number;
}

export interface ProgramacionType {
  id: string;
  nombre: string;
  clientes: ClienteProgramado[];
  activo: boolean;
}
