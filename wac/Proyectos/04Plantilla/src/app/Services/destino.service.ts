import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDestino } from '../Interfaces/idestino'; // Asegúrate de crear esta interfaz
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  apiurl = 'http://localhost/uniandes/wormandrade/wac/Proyectos/agenciaViajes/controller/destino.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  todos(): Observable<IDestino[]> {
    return this.http.get<IDestino[]>(this.apiurl + 'todos');
  }

  // Método para obtener un producto por su ID
  uno(idDestino: number): Observable<IDestino> {
    const formData = new FormData();
    formData.append('idDestino', idDestino.toString());
    return this.http.post<IDestino>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un producto por su ID
  eliminar(idDestino: number): Observable<number> {
    const formData = new FormData();
    formData.append('idDestino', idDestino.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo producto junto con el kardex
  insertar(destino: IDestino): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', destino.nombre);
    formData.append('pais', destino.pais);
    formData.append('ciudad', destino.ciudad);
    formData.append('descripcion', destino.descripcion);
    formData.append('costo', destino.costo.toString());

    // Insertar el producto y kardex
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un producto
  actualizar(destino: IDestino): Observable<string> {
    const formData = new FormData();
    formData.append('idDestino', destino.idDestino.toString());
    formData.append('nombre', destino.nombre);
    formData.append('pais', destino.pais);
    formData.append('ciudad', destino.ciudad);
    formData.append('descripcion', destino.descripcion);
    formData.append('costo', destino.costo.toString());

    // Actualizar el producto
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
