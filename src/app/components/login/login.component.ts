import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
		  private _route: ActivatedRoute,
		  private _snackBar: MatSnackBar,
          ) {
  		this.page_title = "Login";
		  this.user = new User('','','','','','',1);
  	}

  	ngOnInit(){
  		//Se ejecuta siempre y cierra sesión solo cuando le llega el parametro sure por la url
  		this.logout();
  	}

  	onSubmit(form){
  		this._userService.signup(this.user).subscribe(
  			response => {
  				if(response.status == 'success'){
     	            this.success = true;
					this.token = response.token;
					this.identity = {
						"id": response.user.id,
						"firstname": response.user.firstname,
						"lastname": response.user.lastname, 
						"email": response.user.email,
						"password": response.user.password,
						"phone_number": response.user.phone_number,
						"default_lang": response.user.default_lang,
						"active": response.user.active,
						"created_at": response.user.created_at,
					}     	            	
                     
                    //PERSISTIR DATOS USUARIO IDENTIFICADO
					localStorage.setItem('token', this.token);
					localStorage.setItem('identity', JSON.stringify(this.identity));

					this.showToastInfo('Bienvenido '+response.user.firstname, 'X');
     	            //Redirección a LISTA DE USUARIOS
					this._router.navigate(['/users/list']);
	          	} else {
					this.success = false;
					this.showToastInfo(response.message, 'X');
	          	}
  			},
  			error => {
  				this.success = false;
  				this.showToastInfo('Login incorrecto', 'X');
  			}
  		);
  	}

  	logout(){
  		this._route.params.subscribe(params => {
  			let logout = +params['sure']; //El + es para convertir a entero

  			if(logout == 1){
				this.showToastInfo('¡Hasta pronto!', 'X');
  				localStorage.removeItem('identity');
  				localStorage.removeItem('token');

  				this.identity = null;
          		this.token = null;
          
  				//Redirección a INICIO
  				this._router.navigate(['/']);
  			}
  		})
	}
	  
	showToastInfo(message, action){
		this._snackBar.open(message, action, {
			duration: 5000,
		});
	}

}
