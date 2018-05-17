import { Component } from '@angular/core';

@Component({
  selector: 'notfound-page',
  template: `
  			<header-section></header-section>
	  		<main>
	  			<div class="container">
	                <div class="row align-items-center">
	    	  			<div class="col text-center mt-5">
	                        <h1>404</h1>
	                        <h2>You Missed</h2>
	                        <p>The page you are looking for doesn't exist</p>
	                        <button class='btn btn-primary' [routerLink]="['/home']">Go to Home Page</button>
	                    </div>
		  			</div>
	  			</div>
	  		</main>`,
})
export class NotFoundPage {

}
