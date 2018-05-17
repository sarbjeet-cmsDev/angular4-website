import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { UtilService } from '../providers/util';

@Component({
  selector: 'user-booking-page',
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
									<h4>Appointments</h4>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12" *ngFor="let appointment of booking">
									<div class="row">
										<div class="col-md-2">
											<img width="100px" [src]="appointment.business.logo_url" />
										</div>
										<div class="col-md-10">
											<div class="row">
												<div class="col-md-12">
													<div class="row">
														<div class="col-md-6">
															<h4>{{ appointment.business.name }}</h4>
															<p>{{ appointment.from | date:'medium' }}</p>
														</div>
														<div class="col-md-6 text-right">
															<button class="btn btn-link" [routerLink]="['/booking',appointment.id]">View Detail</button>
														</div>
													</div>
												</div>
												<div class="col-md-12" *ngFor="let service of appointment.services">
													<div class="row">
														<div class="col-md-6">
															<h5>{{ service.title }}</h5>
														</div>
														<div class="col-md-6 text-right">
															<p>{{ service.from | date:'shortTime' }} - {{ service.to | date:'shortTime' }}</p>
														</div>
													</div>
												</div>
												<div class="col-md-6">
													<strong>Status : {{ appointment.status | uppercase }}</strong>
												</div>
												<div class="col-md-6 text-right">
													<strong>{{ appointment.total | currency:appointment.business.currency }}</strong>
												</div>

											</div>
										</div>
										<div class='col-md-12'>
											<hr/>
										</div>
									</div>
								</div>
							</div>
							<div class="row pb-5">
					  			<div class="col-md-12" *ngIf='booking.length && pages.length > 1'>
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
export class UserBookingPage {
	totalResult:number = 0;
    currentPage:number = 1;
    lastPage:number = 1;
    pages:Array<any> = [];
	booking:Array<any> = [];

	constructor(private dataService: DataService) {
		this.loadBooking();
    }
    loadPage(page){
        if(page != '...') this.loadBooking(page);
    }
    loadBooking(page=1){
    	this.dataService.get("web/booking?page="+page).subscribe(res => {
			this.booking = res.data;
            this.pages = UtilService.pagination(res.current_page,res.last_page);
            this.totalResult = res.total;
            this.lastPage = res.last_page;
            this.currentPage = res.current_page;
		});
    }
}
