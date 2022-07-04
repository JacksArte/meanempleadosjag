import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearEmpleadosComponent } from './pages/crear-empleados/crear-empleados.component';
import { EditarEmpleadosComponent } from './pages/editar-empleados/editar-empleados.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { EmpleadoService } from './services/empleado.service';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearEmpleadosComponent,
    EditarEmpleadosComponent,
    ListarEmpleadosComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
