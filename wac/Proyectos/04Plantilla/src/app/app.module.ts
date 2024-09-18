// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
//import { ProveedoresComponent } from './proveedores/proveedores.component'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NuevoproveedorComponent } from './proveedores/nuevoproveedor/nuevoproveedor.component';
import LoginComponent from './demo/authentication/login/login.component';
import { DefaultComponent } from './demo/default/dashboard/dashboard.component';

import { TuristaComponent } from './turista/turista.component';
import { NuevoturistaComponent } from './turista/nuevoturista/nuevoturista.component';
import { DestinoComponent } from './destino/destino.component';
import { NuevodestinoComponent } from './destino/nuevodestino/nuevodestino.component';
import { ReservaComponent } from './reserva/reserva.component';
import { NuevareservaComponent } from './reserva/nuevareserva/nuevareserva.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    //ProveedoresComponent,
    //NuevoproveedorComponent,
    TuristaComponent,
    NuevoturistaComponent,
    DestinoComponent,
    NuevodestinoComponent,
    ReservaComponent,
    NuevareservaComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
