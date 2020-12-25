import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements DoCheck {
	title = 'administrador';
	public identity: {};
	public token: string;

	constructor( private _userService: UserService ){
		this.loadUser();
	}

	ngDoCheck(){
    this.loadUser();
    console.log(this.identity);
    console.log(this.token);

	}

	loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

}
