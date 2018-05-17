import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'user-menu',
  template: `
  			<h4>Your Profile</h4>
  			<ul class="list-group">
  				<li class="list-group-item" [class.active]="isActive('/account')"><a [routerLink]="['/account']">Account</a></li>
  				<li class="list-group-item" [class.active]="isActive('/booking')"><a [routerLink]="['/booking']">Booking</a></li>
  				<li class="list-group-item" [class.active]="isActive('/favourite')"><a [routerLink]="['/favourite']">Favourites</a></li>
  				<li class="list-group-item" [class.active]="isActive('/reviews')"><a [routerLink]="['/reviews']">Reviews</a></li>
  			</ul>
			`,
})
export class UserMenu{
	constructor(private router: Router) {
		console.log()
	}
	isActive(url){
		return this.router.url.indexOf(url) > -1;
	}
}
