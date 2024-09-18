import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFactura } from 'src/app/Interfaces/reserva';
import { ITurista} from 'src/app/Interfaces/iturista';
import { TuristaService } from 'src/app/Services/turista.service';
import { ReservaService } from 'src/app/Services/reserva.service';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';
//import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nuevareserva',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevareserva.component.html',
  styleUrl: './nuevareserva.component.scss'
})
export class NuevareservaComponent implements OnInit {
  //variables o constantes
  titulo = 'Nueva Reserva';
  listaClientes: ITurista[] = [];
  listaClientesFiltrada: ITurista[] = [];
  totalapagar: number = 0;
  //formgroup
  frm_reserva: FormGroup;
  reservaelejido: any[] = [
    {
      idTurista: 1,
      isDestino: 1,
      forma_pago: 'Contado',
      comentario: 'En familia',
      fecha: '2024-10-01'
    },
    {
      idTurista: 2,
      isDestino: 2,
      forma_pago: 'Contado',
      comentario: 'En familia',
      fecha: '2024-10-10'
    }
  ];

  ///////
  constructor(
    private turistaServicios: TuristaService,
    private reservaService: ReservaService,
    private navegacion: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_reserva = new FormGroup({
      idTurista: new FormControl('', Validators.required),
      idDestino: new FormControl('', Validators.required),
      forma_pago: new FormControl('', Validators.required),
      fecha: new FormControl('0.15', Validators.required),
    });

    this.reservaServicios.todos().subscribe({
      next: (data) => {
        this.listaTurista = data;
        this.listaturistaFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  grabar() {

    //PDF CON PDFMAKER
    const DATA: any = {
      content: [
        {
          text: 'Reserva',
          style: 'header',
        },
        {
          columns: [
            {
              text: 'Fecha: ' + this.frm_reserva.get('fecha')?.value,
              style: 'subheader',
            },
            {
              text: 'Turista: ' + this.frm_reserva.get('idTurista')?.value,
              style: 'subheader',
              alignment: 'left'
            },
          ],
        },
        {
          columns: [
            {
              text: 'Destino: ' + this.frm_reserva.get('isDestino')?.value,
              style: 'subheader',
            },
            {
              text: 'Forma de Pago: ' + this.frm_reserva.get('forma_pago')?.value,
              style: 'subheader',
              alignment: 'left'
            },
          ],
        },
        {
          columns: [
            {
              text: 'Comentario: ' + this.frm_reserva.get('comentario')?.value,
              style: 'subheader',
            }
          ],
        },
        {
          text: 'Reservas',
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Fecha', style: 'tableHeader' },
                { text: 'Turista', style: 'tableHeader' },
                { text: 'Destino', style: 'tableHeader' },
                { text: 'Forma de pago', style: 'tableHeader' },
                { text: 'Comentario', style: 'tableHeader' }
              ],
              ...this.destinoelejido.map((destino) => [
                destino.idTurista,
                destino.idDestino,
                destino.forma_pago,
                destino.comentario,
                destino.fecha
              ]),
            ],
          },
          layout: 'lightHorizontalLines', // Agrega líneas horizontales para mejorar la legibilidad
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center', // Centra el texto del encabezado
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          alignment: 'center',
        },
      },
    };
    
    // Crear el PDF y guardarlo
    pdfMake.createPdf(DATA).download('reserva.pdf');
    
    

    //pdf copn html2canva

    /*const DATA: any = document.getElementById('impresion');
    html2canvas(DATA).then((html) => {
      const anchoorignal = html.width;
      const altooriginal = html.height;

      const imgAncho = (anchoorignal * 1 * 200) / anchoorignal;
      const imgAlto = (altooriginal * 1 * 200) / altooriginal;

      const constenido = html.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const posicion = 0;
      pdf.addImage(constenido, 'PNG', 0, posicion, imgAncho, imgAlto);
      pdf.save('factura.pdf');
    });
    /* pdf con jspdf
    const doc = new jsPDF();
    doc.text('Lista de prodcutos', 10, 10);

    const columnas = ['Descripcion', 'Cantidad', 'Precio', 'Subtotal', 'IVA', 'Total'];
    const filas: any[] = [];
    this.productoelejido.forEach((producto) => {
      const fila = [producto.Descripcion, producto.Cantidad, producto.Precio, producto.Subtotal, producto.IVA, producto.Total];
      filas.push(fila);
    });

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      start: 20
    });

    doc.save('factura.pdf');

    /*
    let factura: IFactura = {
      Fecha: this.frm_factura.get('Fecha')?.value,
      Sub_total: this.frm_factura.get('Sub_total')?.value,
      Sub_total_iva: this.frm_factura.get('Sub_total_iva')?.value,
      Valor_IVA: this.frm_factura.get('Valor_IVA')?.value,
      Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
    };

    this.facturaService.insertar(factura).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Factura grabada');
        this.navegacion.navigate(['/facturas']);
      }
    });*/
  }
  
  cambio(objetoSleect: any) {
    let idTurista = objetoSleect.target.value;
    this.frm_reserva.get('idTurista')?.setValue(idTurista);
  }
  productosLista(evnto) {
    alert('lista de destinos cargando');
    //servicio de prodcuto para cargar los productos
  }
  cargaModal(valoresModal: any) {
    //productoelejido

    const nuevodestino: any = {
      idTurista: 1,
      isDestino: 2,
      forma_pago: 'Contado',
      comentario: 'En familia',
      fecha: '2024-10-25'
    };
    this.destinoelejido.push(nuevodestino);
    this.modal.dismissAll();

  }
}