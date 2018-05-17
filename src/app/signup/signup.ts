import { Component } from '@angular/core';
import { AuthGuard } from '../providers/guard';
import { DataService } from '../providers/data';
import { Router } from '@angular/router';
@Component({
  selector: 'signup-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row justify-content-md-center">
		                <div class="col-6">
		                	<signup-widget (signedInEvent)="loggedIn($event)" (loginEvent)="login($event)"></signup-widget>
		    	  		</div>
	    	  		</div>
	  			</div>
	  		</main>`,
})
export class SignUpPage {
	step:number = 1;
	code:number;
	constructor(private authService: AuthGuard,
		private dataService: DataService,
		private router: Router) {

    }
    loggedIn(user){
    	this.router.navigate(['/account']);
    }
    login(ev){
    	this.router.navigate(['/login']);
    }

}
