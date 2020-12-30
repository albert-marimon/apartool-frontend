import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.css']
})
export class DataDialogComponent {
  action:string;

  public form: FormGroup;
  public firstname: AbstractControl;
  public lastname: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public phone_number: AbstractControl;
  public default_lang: AbstractControl;
  public created_at: Date;
  public id: number;
  public submitted = false;
  

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<DataDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data
  ) {
    this.action = data.action;

    //Validaciones por ACTION
    if (this.action == 'Añadir'){
      this.form = this.fb.group({
        firstname: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]+")])],
        lastname: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required])],
        default_lang: ['', Validators.compose([Validators.required])],
        phone_number: ['', Validators.compose([Validators.required])],
      });
    } else if(this.action == 'Actualizar'){
      this.form = this.fb.group({
        firstname: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]+")])],
        lastname: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [''],
        default_lang: ['', Validators.compose([Validators.required])],
        phone_number: ['', Validators.compose([Validators.required])],
      });
    } else if(this.action == 'Eliminar'){
      this.form = this.fb.group({
        firstname: [''],
        lastname: [''],
        email: [''],
        password: [''],
        default_lang: [''],
        phone_number: [''],
      });
    }

    //Control de campos si requiere formulario
    if(this.action == "Añadir" || this.action == "Actualizar" || this.action == "Eliminar"){
      this.firstname = this.form.controls['firstname'];
      this.lastname = this.form.controls['lastname'];
      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
      this.default_lang = this.form.controls['default_lang'];
      this.phone_number = this.form.controls['phone_number'];
      this.id = data.id;
    }

    //Relleno campos o relleno información de usuario
    if (this.action == 'Actualizar'){
      this.firstname.setValue(data.firstname);
      this.lastname.setValue(data.lastname);
      this.email.setValue(data.email);
      this.phone_number.setValue(data.phone_number);
      this.default_lang.setValue(data.default_lang);
      this.created_at = data.created_at;
    } else if (this.action == 'Show' || this.action == 'Eliminar'){
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.email = data.email;
      this.phone_number = data.phone_number;
      this.default_lang = data.default_lang;
      this.created_at = data.created_at;
    }
  }

  get f() { return this.form.controls; }

  doAction(){
    this.submitted = true;
    //Si es añadir o Actualizar bloquear formulario si no es válido
    if (this.action == 'Añadir' || this.action == 'Actualizar') {
      if(this.form.invalid){
        return;
      }
    }

    this.dialogRef.close({
      event:this.action,
      id: this.id,
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      password: this.password,
      default_lang:this.default_lang,
      phone_number:this.phone_number,
    });
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
