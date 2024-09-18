import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Iproveedor } from 'src/app/Interfaces/iproveedor';
//import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
//import { ProveedorService } from 'src/app/Services/proveedores.service';
//import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';

@Component({
  selector: 'app-nuevodestino',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevodestino.component.html',
  styleUrl: './nuevodestino.component.scss'
})
export class NuevodestinoComponent implements OnInit {
  //listaUnidadMedida: IUnidadMedida[] = [];
  //listaProveedores: Iproveedor[] = [];
  titulo = '';
  frm_Destino: FormGroup;
  constructor(
    //private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    //private proveedoreServicio: ProveedorService
  ) {}
  ngOnInit(): void {
    //this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    //this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));

    this.crearFormulario();

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Destino = new FormGroup({
      nombre: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      costo: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  grabar() {
    console.log(this.frm_Destino.value);
    this.frm_Destino.reset();
    //this.frm_Producto.resetForm();
    //this.frm_Producto.resetForm();
    //this.frm_Producto.resetForm();
  }
}
