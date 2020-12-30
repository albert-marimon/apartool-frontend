import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements DoCheck {
	public identity: {};
	public token: string;
  	public opened: boolean;

	constructor( private _userService: UserService ){
		this.loadUser();
	}

	ngDoCheck(){
    	this.loadUser();
	}

	loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

}
