import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReserva } from '../Interfaces/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  apiurl = 'http://localhost/uniandes/wormandrade/wac/proyectos/agenciaViajes/controller/reserva.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IReserva[]> {
    return this.lector.get<IReserva[]>(this.apiurl + 'todos');
  }

  uno(idReserva: number): Observable<IReserva> {
    const formData = new FormData();
    formData.append('idReserva', idReserva.toString());
    return this.lector.post<IReserva>(this.apiurl + 'uno', formData);
  }

  eliminar(idReserva: number): Observable<number> {
    const formData = new FormData();
    formData.append('idReserva', idReserva.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('idTurista', reserva.idTurista.toString());
    formData.append('idDestino', reserva.idDestino.toString());
    formData.append('forma_pago', reserva.forma_pago.toString());
    formData.append('comentario', reserva.comentario.toString());
    formData.append('fecha', reserva.fecha.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('idReserva', reserva.idReserva.toString());
    formData.append('idTurista', reserva.idTurista.toString());
    formData.append('idDestino', reserva.idDestino.toString());
    formData.append('forma_pago', reserva.forma_pago.toString());
    formData.append('comentario', reserva.comentario.toString());
    formData.append('fecha', reserva.fecha.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
