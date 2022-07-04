import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Router, ActivatedRoute } from '@angular/router';
import {  EmpleadoService } from 'src/app/services/empleado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-empleados',
  templateUrl: './editar-empleados.component.html',
  styleUrls: ['./editar-empleados.component.css']
})
export class EditarEmpleadosComponent implements OnInit {

  //propiedades
  enviado = false;
  editForm: FormGroup;
  empleadoDepartamentos: any = [
    'Administracion','Finanzas','Recursos Humanos','TI','Ventas'
  ];
  empleadoData: Empleado[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);
    this.editForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      email: ['',[
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
       ],],
       telefono: ['',[
         Validators.required,
         Validators.pattern('^[0-9]+$'),
         ],],
       });
  }

 //construimos el formulario
 mainForm(){
  this.editForm = this.formBuilder.group({
    nombre: ['',[Validators.required]],
    departamento: ['',[Validators.required]],
    email: ['',[
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
     ],],
     telefono: ['',[
       Validators.required,
       Validators.pattern('^[0-9]+$'),
       ],],
     });
   }

   //seleccionar departamento con un select
   actualizarDepartamento(d){
    this.editForm.get('departamento').setValue(d, {
      onlySelf: true,
    });
  }

  //getter para acceder al form control 
  get myForm(){
    return this.editForm.controls;
  }

  //obtenemos el empleado que se va a modificar por su id
  getEmpleado(id){
    this.empleadoService.getEmpleado(id).subscribe((data) => {
      this.editForm.setValue({
        nombre: data['nombre'],
        departamento: data['departamento'],
        email: data['email'],
        telefono: data['telefono']
      });
    });
  }

  //método que se ejecuta cuando el usuario envia el formulario
  onSubmit(){
    this.enviado = true
    if(!this.editForm.valid){
      return false;
    }else{
      if(window.confirm('¿Estás seguro que deseas modificar?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.empleadoService.updateEmpleado(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/listar-empleados');
            console.log('Se actualizó correctamente');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}