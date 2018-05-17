import { Injectable } from '@angular/core';
import { Resolve,Router, ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthGuard } from '../providers/guard';

@Injectable()
export class AuthResolver implements Resolve<any> {

	constructor(private authService: AuthGuard,
		private router: Router,
		private route: ActivatedRoute){}

	resolve(){
		this.route.url.subscribe((res) => console.log(res))

		console.log(window.location.pathname);
		console.log(this.router.url);
		console.log(this.route.params);
	    return this.authService.isLoggedIn();
	}
}
