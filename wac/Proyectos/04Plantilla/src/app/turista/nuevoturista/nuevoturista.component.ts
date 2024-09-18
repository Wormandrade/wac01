import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TuristaService } from 'src/app/Services/turista.service';
import { ITurista } from 'src/app/Interfaces/iturista';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-nuevoturista',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoturista.component.html',
  styleUrl: './nuevoturista.component.scss'
})
export class NuevoturistaComponent implements OnInit {
  frm_Turista = new FormGroup({
    //idClientes: new FormControl(),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', Validators.required),
    
  });
  idTurista = 0;
  titulo = 'Nuevo Turista';
  constructor(
    private turistaServicio: TuristaService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idTurista = parseInt(this.ruta.snapshot.paramMap.get('idTurista'));
    if (this.idTurista > 0) {
      this.turistaServicio.uno(this.idTurista).subscribe((unturista) => {
        this.frm_Turista.controls['nombre'].setValue(unturista.Nombres);
        this.frm_Turista.controls['apellido'].setValue(unturista.apellido);
        this.frm_Turista.controls['correo'].setValue(unturista.Correo);
        this.frm_Turista.controls['telefono'].setValue(unturista.Telefono);

        this.titulo = 'Editar Turista';
      });
    }
  }

  grabar() {
    let turista: ITurista = {
      idTurista: this.idTurista,
      nombre: this.frm_Turista.controls['nombre'].value,
      apellido: this.frm_Turista.controls['apellido'].value,
      correo: this.frm_Turista.controls['correo'].value,
      telefono: this.frm_Turista.controls['telefono'].value,

    };

    Swal.fire({
      title: 'Turista',
      text: 'Desea guardar al Turista ' + this.frm_Turista.controls['nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idTurista > 0) {
          this.turistaServicio.actualizar(turista).subscribe((res: any) => {
            Swal.fire({
              title: 'Turista',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/turista']);
          });
        } else {
          this.turistaServicio.insertar(turista).subscribe((res: any) => {
            Swal.fire({
              title: 'Turista',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/turista']);
          });
        }
      }
    });
  }
}
