import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {

  empleados:any = [];

  constructor(private empleadoService:EmpleadoService) { 
    this.getEmpleados();
  }

  ngOnInit(): void {
  }

  //método para obtener todos los empleados
  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    })
  }

  //método para borrar un empleado
  eliminarEmpleado(empleado, index){
    if(window.confirm('¿Estás seguro que lo deseas eliminar?')){
      this.empleadoService.deleteEmpleado(empleado._id).subscribe((data) => {
        this.empleados.splice(index, 1);
      })
    }
  }
}
