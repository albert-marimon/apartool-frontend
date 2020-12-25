import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
     selector: 'login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.css'],
     providers: [UserService]
})
export class LoginComponent implements OnInit {
     public page_title: string;
     public user: User;
     public success: boolean;
     public token: string;
     public identity: {};

  	constructor(
          private _userService: UserService,
          private _router: Router,
          private _route: ActivatedRoute
          ) {
  		this.page_title = "Login";
  		this.user = new User('','','','','','',false);
  	}

  	ngOnInit(){
  		//Se ejecuta siempre y cierra sesión solo cuando le llega el parametro sure por la url
  		this.logout();
  	}

  	onSubmit(form){
  		this._userService.signup(this.user).subscribe(
  			response => {
  				if(response.success != false){
     	            	this.success = true;
     	            	this.token = response.token;
     	            	this.identity = {
                      "id": response.id_user,
                      "firstname": response.firstname,
                      "lastname": response.lastname, 
     	            		"email": response.email,
                      "password": response.password,
                      "phone_number": response.phone_number,
                      "default_lang": response.default_lang,
                      "active": response.active,
                      "created_at": response.created_at,
     	            	}     	            	
                     
                     //PERSISTIR DATOS USUARIO IDENTIFICADO
     	            	localStorage.setItem('token', this.token);
     	            	localStorage.setItem('identity', JSON.stringify(this.identity));

     	            	//Redirección a INICIO
       				 this._router.navigate(['/']);
	          	} else {
	            	this.success = false;
	          	}
  			},
  			error => {
  				this.success = false;
  				console.log(<any>error);
  			}
  		);
  	}

  	logout(){
  		this._route.params.subscribe(params => {
  			let logout = +params['sure']; //El + es para convertir a entero

  			if(logout == 1){
  				localStorage.removeItem('identity');
  				localStorage.removeItem('token');
                    localStorage.removeItem('products');

  				this.identity = null;
          this.token = null;
          
  				//Redirección a INICIO
  				this._router.navigate(['/']);
  			}
  		})
  	}

}
