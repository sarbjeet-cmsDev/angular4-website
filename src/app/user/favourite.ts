import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { AuthGuard } from '../providers/guard';
import { Router } from '@angular/router';
@Component({
  selector: 'user-favourite-page',
  template: `<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row pb-5">
	    	  			<div class="col-md-4 mt-5">
	                        <user-menu></user-menu>
	                    </div>
	                    <div class="col-md-8 mt-5">
	                    	<div class="row">
								<div class="col">
									<h4>Favourites</h4>
									<hr/>
								</div>
							</div>
							<div class="row" *ngIf='favourite.length'>
								<div class="col-md-6" *ngFor="let business of favourite">
									<div class='row business-block'>
										<div class='col-md-12 business-image-block'>
											<img src="{{ business.cover_image_url }}" alt="">
											<div class="static">
												<h4><a [routerLink]="['/business',business.url_key]">{{ business.name }}</a></h4>
												<p class="listing-location m-0">{{ business.formatted_address }}</p>
												<a [routerLink]="['/business',business.url_key]" class="book">Book Now</a>
											</div>
										</div>
										<div class='col-md-12'>
											<div class='business-block'>
												<div class="row m-0 mt-2 mb-2"  *ngFor="let service of business.services">
													<div class='col-md-4'>
														<strong>{{ service.title }}</strong>
													</div>
													<div class='col-md-3'>
														{{ service.options[0].format_duration }}
													</div>
													<div class='col-md-5 text-right'>
														<small>start from</small> {{ service.options[0].price | currency:business.currency }}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row" *ngIf='!loading && !favourite.length'>
								<div class="col text-center">
									<div class="no-result pt-5 pb-5">
										<h3>No Favourite</h3>
										<p>Go to Business Page and Click Heart icon to add to favourite</p>
										<button [routerLink]="['/search']" class="btn btn-outline">Search Business</button>
									</div>
								</div>
							</div>
	                    </div>
		  			</div>
	  			</div>
	  		</main>
  			`,
})
export class UserFavouritePage {
	user:any = {};
	favourite:Array<any> = [];
	loading:boolean = true;

	constructor(private authService: AuthGuard,
		private dataService: DataService,
		private router: Router) {
		authService.user.subscribe(user => this.user = user);
		this.dataService.get('/web/favourite').subscribe(favourite => {
			this.favourite = favourite;
			this.loading = false;
		});
    }
}
