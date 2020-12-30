import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

import { tap,map } from 'rxjs/operators';

@Injectable()
export class UserService{
	public url: string;
	public identity: {};
	public token: string;

	constructor(public _http: HttpClient){
		this.url = global.url;
	}

	getUsers():  Observable<any>{
		let headers = new HttpHeaders()
			.set('Content-type', 'application/json')
		return this._http.get(this.url+'user', {headers: headers})
			.pipe(tap(users => users));
	}

	register(user): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'user', params, {headers: headers});
	}

	signup(user, gettoken = null): Observable<any>{
		if(gettoken != null){
			user.gettoken = true;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this._http.post(this.url+'login', params, {headers: headers});
	}

	update(user, id, gettoken = null): Observable<any>{
		if(gettoken != null){
			user.gettoken = true;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		
		return this._http.put(this.url+'user/'+id, params, {headers: headers});
	}

	delete(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		
		return this._http.delete(this.url+'user/'+id, {headers: headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != "undefined"){
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token && token != "undefined"){
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}

}
