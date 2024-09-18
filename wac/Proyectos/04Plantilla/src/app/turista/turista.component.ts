import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ITurista } from '../Interfaces/iturista';
import { TuristaService } from '../Services/turista.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.scss'
})
export class TuristaComponent {
  listaturista: ITurista[] = [];
  constructor(private turistaServicio: TuristaService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.turistaServicio.todos().subscribe((data) => {
      console.log(data);
      this.listaturista = data;
    });
  }
  eliminar(idTurista) {
    Swal.fire({
      title: 'Turista',
      text: 'Esta seguro que desea eliminar el turista!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Turista'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turistaServicio.eliminar(idTurista).subscribe((data) => {
          Swal.fire('Clientes', 'El turista ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
