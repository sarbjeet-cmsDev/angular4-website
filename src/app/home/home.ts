import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './home.html',
})
export class HomePage {
	title = 'app';

	constructor(private router: Router,
		private meta: Meta){

	}
	search() {
		//alert("Asdasd");
	    this.router.navigateByUrl('/contact');
	}
}
