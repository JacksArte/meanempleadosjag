import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {

  //propiedades
  empleadoForm: FormGroup;
  enviado = false;//cuando el formulario se envie se cambie a true
  empleadoDepartamentos: any = [
    'Administracion','Finanzas','Recursos Humanos','TI','Ventas'
  ];

  constructor(
    //elementos
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  //construimos el formulario
  mainForm(){
    this.empleadoForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      email: ['',[
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),//validar que sea un correo
      ],],
      telefono: ['',[
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ],],
    });
  }

  //seleccionar departamento con un select
  actualizarDepartamento(d){
    this.empleadoForm.get('departamento').setValue(d, {
      onlySelf: true,
    });    
  }

  //getter para acceder al form control
  get myForm(){
    return this.empleadoForm.controls;
  }

  //método que se ejecuta cuando se envia el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.empleadoForm.valid){
      return false;
    }else{
      return this.empleadoService.agregarEmpleado(this.empleadoForm.value).subscribe({
        complete: () => {
          console.log('Empleado agregado correctamente'),
          this.ngZone.run(() => this.router.navigateByUrl('/listar-empleados'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
