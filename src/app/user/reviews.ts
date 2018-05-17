import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { UtilService } from '../providers/util';

@Component({
  selector: 'user-review-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row pb-5">
	    	  			<div class="col-md-4 mt-5">
	                        <user-menu></user-menu>
	                    </div>
	                    <div class="col-md-8 mt-5">
	                    	<div class="row">
								<div class="col">
									<h4>Reviews</h4>
									<hr/>
								</div>
							</div>
							<div class="row" *ngIf='!loading && !reviews.length'>
								<div class="col text-center">
									<div class="no-result pt-5 pb-5">
										<h3>No Reviews</h3>
										<p>Rezervnow cares about the reliability of reviews, therefore you will only be able to add a review after your visit.</p>
										<button [routerLink]="['/search']" class="btn btn-outline">Book Appointment</button>
									</div>
								</div>
							</div>
							<div class="row pb-5">
					  			<div class="col-md-12" *ngIf='reviews.length && pages.length > 1'>
							        <nav>
							            <ul class="pagination justify-content-end">
							                <li class="page-item">
							                    <a class="page-link" (click)="loadPage(1)">
							                        <span aria-hidden="true"><i class="fal fa-angle-double-left"></i></span>
							                    </a>
							                </li>
							                <ng-container *ngFor="let page of pages;let i = index">
							                    <ng-container>
							                        <li  [class.active]="(page == currentPage)" class="page-item">
							                            <a (click)="loadPage(page)" class="page-link">{{ page }}</a>
							                        </li>
							                    </ng-container>
							                </ng-container>
							                <li class="page-item">
							                    <a class="page-link" (click)="loadPage(lastPage)">
							                        <span aria-hidden="true"><i class="fal fa-angle-double-right"></i></span>
							                    </a>
							                </li>
							            </ul>
							        </nav>
							    </div>
						    </div>
	                    </div>
		  			</div>
	  			</div>
	  		</main>`,
})
export class UserReviewPage {
	totalResult:number = 0;
    currentPage:number = 1;
    lastPage:number = 1;
    pages:Array<any> = [];
	reviews:Array<any> = [];
	loading:boolean = true;

    constructor(private dataService: DataService) {
		this.loadReviews();
    }
    loadPage(page){
        if(page != '...') this.loadReviews(page);
    }
    loadReviews(page=1){
    	this.dataService.get("web/reviews?page="+page).subscribe(res => {
			this.reviews = res.data;
            this.pages = UtilService.pagination(res.current_page,res.last_page);
            this.totalResult = res.total;
            this.lastPage = res.last_page;
            this.currentPage = res.current_page;
            this.loading = false;
		});
    }
}
