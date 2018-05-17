import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGuard implements CanActivate {

	public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public favourites: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

	constructor(private router: Router,
		private dataService: DataService) {
		this.isLoggedIn().subscribe(res =>{
			this.dataService.get('web/favourite/ids').subscribe(favourite=> this.favourites.next(favourite));
		});
	}
	canActivate(route) {
		let token = localStorage.getItem('token');
		if (token != null && token.length)
		{
			return true;
		}
		else{
			this.router.navigate(['/login']);
			return false;
		}
	}
	login(data){
		return this.dataService.post('/web/login',data).map(user=>{
			localStorage.setItem('token',user.token);
			this.user.next(user);
			return user;
		});
	}
	signup(data){
		return this.dataService.post('/web/signup',data).map(user=>{
			localStorage.setItem('token',user.token);
			this.user.next(user);
			return user;
		});
	}
	isLoggedIn(){
		return this.dataService.get('/web/islogged').map(user => {
			this.user.next(user);
		}).catch((err)=>{
			this.user.next(null);
			localStorage.setItem('token','');
			return Observable.throw(err);
		});
	}
	logout(){
		localStorage.setItem('token',"lkhlkdjhljghlgjhlfdhjklg");
		this.user.next(null);
	}
}