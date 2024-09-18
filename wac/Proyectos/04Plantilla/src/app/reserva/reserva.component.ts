import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IReserva } from '../Interfaces/reserva';
import { Router, RouterLink } from '@angular/router';
import { ReservaService } from '../Services/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent implements OnInit {
  listafacturas: IReserva[] = [];
  router: any;
  facturaAEditar: IReserva;
  constructor(private facturaServicio: ReservaService) {}
  ngOnInit(): void {
    this.reservaServicio.todos().subscribe((data: IReserva[]) => {
      this.listareserva = data;
    });
  }

  
  eliminar(idReserva) {

    Swal.fire({
      title: 'Reserva',
      text: 'Esta seguro que desea eliminar la reserva!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Reserva'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaServicio.eliminar(idReserva).subscribe((data) => {
          Swal.fire('Reserva', 'La reserva ha sido eliminada.', 'success');
        this.ngOnInit();
        });
      }
    });
  }
  editarFactura(idReserva: number) {
    // 1. Get the invoice details for pre-filling the edit form
    this.reservaServicio.uno(idReserva).subscribe(reserva => {
      // Handle successful retrieval
      if (reserva) {
        // 2. (Optional) Open a modal or navigate to a dedicated edit page
        // - If using a modal:
        this.facturaAEditar = reserva; // Store invoice data for pre-filling
        this.showModalEdit(); // Function to display the edit modal
  
        // - If navigating to a dedicated edit page:
        // this.router.navigate(['/facturas/editar', idFactura]);
        // Replace '/facturas/editar' with your actual edit route
      } else {
        // Handle error if invoice not found
        Swal.fire('Error', 'La reserva no se encontró.', 'error');
      }
    });
  }
  showModalEdit() {
    throw new Error('Method not implemented.');
  }
}
