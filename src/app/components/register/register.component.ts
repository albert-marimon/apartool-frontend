import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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


  	constructor(private _userService: UserService) {
  		this.page_title = "Regístrate";
  		this.user = new User('', '', '', '', '', '', 0);
    }
    
  	onSubmit(form){
  		this._userService.register(this.user).subscribe(
  			response => {
				if(response.success){
					this.success = response.success;
					form.reset();
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
}

