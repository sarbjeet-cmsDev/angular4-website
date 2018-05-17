import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../providers/guard';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'login-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row justify-content-md-center">
		                <div class="col-6">
		                	<login-widget (signUpEvent)="signup($event)" (signedInEvent)="loggedIn($event)"></login-widget>
		    	  		</div>
	    	  		</div>
	  			</div>
	  		</main>
			`,
})
export class LoginPage {
	constructor(private authService: AuthGuard,
		private router: Router) {
		
    }
    signup(ev){
		this.router.navigate(['/signup']);
	}
	loggedIn(user){
		this.router.navigate(['/account']);
	}

}
