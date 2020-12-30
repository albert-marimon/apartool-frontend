import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [UserService]
})

export class RegisterComponent {
	public page_title: string;
	public user: User;
  	public success: boolean;


  	constructor(
		private _userService: UserService,
		private router: Router,
		private _snackBar: MatSnackBar,
	) {
  		this.page_title = "Regístrate";
  		this.user = new User('', '', '', '', '', '', 1);
    }
    
  	onSubmit(form){
  		this._userService.register(this.user).subscribe(
  			response => {
				if(response.status == 'success'){
					this.success = response.success;
					form.reset();
					this.showToastInfo('Usuario registrado correctamente', 'X');
					this.router.navigate(['/login']);
				} else {
					this.success = false;
					this.showToastInfo('Usuario registrado correctamente', 'X');
				}
  			},
  			error => {
          		this.success = false;
				this.showToastInfo(<any>error, 'X');
  			}
  		);
	  }
	  
	showToastInfo(message, action){
		this._snackBar.open(message, action, {
			duration: 5000,
		});
	}
}

