import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../providers/data';
declare var $:any;

@Component({
  selector: 'home-page-section-review',
  template: `
  			<div class="container">
	  			<div class="row">
	  				<div class="col-md-12 text-center">
						<h2>What Say <span>Our Customers</span></h2>
						<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
					</div>
		  			<div class="col-md-12 text-center">
		  				<div id="testimonial-2" class="slick-carousel-2">
							<div *ngFor="let review of reviews">
								<div class="col review-block text-center">
									<div class="pic">
										<img src="{{ review.avatar_url }}" alt="">
									</div>
									<div class="detail">
										<p class="description">
											{{ review.review }}
										</p>
										<h5 class="testimonial-title">{{ review.by }}</h5>
										<ul class="testimonial-rating">
											<ng-container *ngFor="let rating of [1,2,3,4,5];let i = index;">
												<li class="fa" [class.fa-star-o]="rating > review.rating"  [class.fa-star]="rating <= review.rating"></li>
											</ng-container>
										</ul>
									</div>
								</div>							
							</div>
						</div>
		  			</div>
	  			</div>
  			</div>`,
})
export class HomePageReviewSection {
	reviews:Array<any> = [];
	country:string = null;
	constructor(private dataService: DataService,
		private route: ActivatedRoute) {
		this.country = window.location.pathname.replace(/^\/|\/$/g, '').split("/")[0];
		this.dataService.get("/web/rezerv/reviews?country="+this.country).subscribe(reviews => {
    		this.reviews = reviews;
    		setTimeout(function(){
    			$('#testimonial-2').slick({
					slidesToShow: 3,
					dots: true,
					prevArrow: false,
    				nextArrow: false,
				  	responsive: [
				  		{breakpoint: 768,settings: {arrows: false,centerPadding: '40px',slidesToShow: 2}},
				  		{breakpoint: 480,settings: {arrows: false,centerPadding: '40px',slidesToShow: 1}}
				  	]
				});
    		},5);
    	});
    }
    ngOnInit() {
		this.route.params.subscribe(params => {
		   console.log(params);
		});
	}
}
