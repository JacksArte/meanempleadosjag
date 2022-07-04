import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadosComponent } from './pages/crear-empleados/crear-empleados.component';
import { EditarEmpleadosComponent } from './pages/editar-empleados/editar-empleados.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'crear-empleado'},
  {path: 'crear-empleado', component: CrearEmpleadosComponent},
  {path: 'editar-empleados/:id', component: EditarEmpleadosComponent},
  {path: 'listar-empleados', component: ListarEmpleadosComponent},
  {path: 'acerca-de',  component: AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
