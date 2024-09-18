import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITurista } from '../Interfaces/iturista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuristaService {
  apiurl = 'http://localhost/uniandes/wormandrade/wac/Proyectos/agenciaViajes/controller/turista.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<ITurista> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<ITurista>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<ITurista[]> {
    return this.lector.get<ITurista[]>(this.apiurl + 'todos');
  }
  uno(idTurista: number): Observable<ITurista> {
    const formData = new FormData();
    formData.append('idTurista', idTurista.toString());
    return this.lector.post<ITurista>(this.apiurl + 'uno', formData);
  }
  eliminar(idTurista: number): Observable<number> {
    const formData = new FormData();
    formData.append('idTurista', idTurista.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(turista: ITurista): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', turista.nombre);
    formData.append('apellido', turista.apellido);
    formData.append('correo', turista.correo);
    formData.append('telefono', turista.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(turista: ITurista): Observable<string> {
    const formData = new FormData();
    formData.append('idturista', turista.idTurista.toString());
    formData.append('nombre', turista.nombre);
    formData.append('apellido', turista.apellido);
    formData.append('correo', turista.correo);
    formData.append('telefono', turista.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
