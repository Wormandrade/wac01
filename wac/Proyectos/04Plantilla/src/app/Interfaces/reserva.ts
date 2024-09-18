export interface IReserva {
  idReserva?: number;
  idTurista: number;
  idDestino: number;
  forma_pago: string;
  comentario: string;
  fecha: Date;
}
