import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  loginForm : any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder){}
  //Agregar acciones del formulario del usuario
  get f() { return this.loginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // Detenerse si el formulario no es válido
    if (this.loginForm.invalid) {
        return;
    }
    //Campos llenos
    if(this.submitted)
    {
      alert("Sesión iniciada!!");
    }
   
  }
    ngOnInit() {
      
      this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
      input5: ['', [Validators.required]],
      input6: ['', [Validators.required]],
      input7: ['', [Validators.required]]
      });
    }
  }