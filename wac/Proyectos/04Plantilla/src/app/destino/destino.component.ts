import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { IDestino } from '../Interfaces/idestino';
import { DestinoService } from '../Services/destino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.scss'
})
export class DestinoComponent implements OnInit {
  listadestino: IDestino[] = [];

  constructor(private destinoServicio: DestinoService) {}

  ngOnInit(): void {
    this.cargadestino();
  }

  cargadestino() {
    this.destinoServicio.todos().subscribe((data) => {
      this.listadestino = data;
      console.log(data);
    });
  }
  trackByFn() {}

  eliminar(idDestino) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el destino',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.destinoServicio.eliminar(idDestino).subscribe((data) => {
          this.cargadestino();
        });
        Swal.fire('Eliminado', 'El destino ha sido eliminado', 'success');
      } else {
        Swal.fire('Error', 'Ocurrio un erro', 'error');
      }
    });
  }
}
