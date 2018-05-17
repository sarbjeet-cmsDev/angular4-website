import { Component } from '@angular/core';
import { DataService } from '../../providers/data';
declare var swal: any;
@Component({
  selector: 'home-page-section-app',
  template: `<div class="container pt-5">
				<div class="row align-items-center">
					<div class="col-md-4">
						<img src="assets/img/app.png" />
					</div>
					<div class="col-md-4 text-left">
						<h2>Download</h2>
						<h3>RezervNow App</h3>
						<h4 class="pl-2">on your mobile phone</h4>
						<a href="" class="link"><img src="assets/img/app-store.png" /></a>
						<a href="" class="link"><img src="assets/img/play-store.png" /></a>
					</div>
					<div class="col-md-4 text-left">
						<h5>Download our app to book appointments right from your phone.</h5>
						<form class="form-inline" #appForm="ngForm">
							<div class="form-group">
								<input type="text" class="form-control" name="phone_number" required placeholder="Your Phonenumber" [class.ng-submitted]="appForm.submitted"  #txtphone="ngModel" ngModel/>
							</div>
							<button (click)="sendlink(appForm)" type="submit" class="btn btn-primary">Send Sms</button>
							<ng-container *ngIf="txtphone.errors && (txtphone.dirty || txtphone.touched || appForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtphone.errors?.required">
							        Phonenumber is required.
							    </div>
							</ng-container>
						</form>
					</div>
				</div>
			</div>`,
})
export class HomePageAppSection {
	constructor(private dataService: DataService) {

    }
	sendlink(form){
    	if(form.valid){
    		this.dataService.post('downloadlink',form.value).subscribe(res=>{
    			swal("Thank you!", "App Link sent to your phone via Text SMS!", "success");
    			form.reset();
    		},err =>{
    			swal("Error!", err.error, "error");
    		});
    	}
    }
}
