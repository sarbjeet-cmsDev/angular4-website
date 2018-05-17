import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'user-booking-detail-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row pb-5">
	    	  			<div class="col-md-4 mt-5">
	                        <user-menu></user-menu>
	                    </div>
	                    <div class="col-md-8 mt-5" *ngIf='appointment'>
	                    	<div class="row">
								<div class="col-md-8">
									<h4>ID: {{ appointment.increment_id }}</h4>
								</div>
								<div class="col-md-4 text-right">
									<strong>Status : {{ appointment.status | uppercase }}</strong>
								</div>
								<div class="col-md-8">
									<h4>Appointment Date: {{ appointment.from | date:'mediumDate' }}</h4>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="row">
										<div class="col-md-12">
											<hr/>
										</div>
										<div class="col-md-12">
											<h4>Business Detail</h4>
										</div>
										<div class="col-md-2">
											<img width="100px" [src]="appointment.business.logo_url" />
										</div>
										<div class="col-md-10">
											<div class="row">
												<div class="col-md-6">
													<h4>{{ appointment.business.name }}</h4>
													<p>{{ appointment.business.formatted_address }}</p>
												</div>
												<div class="col-md-6 text-right">
													<button class="btn btn-link" [routerLink]="['/business',appointment.business.url_key]">Go to Business Page</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<hr/>
								</div>
								<div class="col-md-12">
									<h4>Appointment Services Detail</h4>
								</div>
								<div class='col-md-12'>
									<div class='row'>
										<div class="col-md-12" *ngFor="let service of appointment.services">
											<div class="row">
												<div class="col-md-6">
													<strong>{{ service.title }}</strong>
													<p>With {{ service.staff_name }}</p>
												</div>
												<div class="col-md-6 text-right">
													<p>{{ service.from | date:'shortTime' }} - {{ service.to | date:'shortTime' }}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="offset-md-6 col-md-6 text-right">
									<strong>Total: {{ appointment.total | currency:appointment.business.currency }}</strong>
								</div>
							</div>
	                    </div>
		  			</div>
	  			</div>
	  		</main>
			`,
})
export class UserBookingDetailPage {
	appointment:any;
	constructor(private dataService: DataService,
		private route: ActivatedRoute) {

		this.route.params.subscribe(params => {
			this.dataService.get("web/booking/"+params.id).subscribe(appointment=>{
				this.appointment = appointment;
			})
		});
    }
}
