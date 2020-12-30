import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public token: string;
  public identity: {};

  constructor(private _userService: UserService, private router: Router) {
    this.loadUser();
    if (this.token) {
		  router.navigate(['/users/list']);
		} else {
      router.navigate(['/login']);
    }
  }

  loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

}
