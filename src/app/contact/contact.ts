import { Component } from '@angular/core';

import { DataService } from '../providers/data';

@Component({
  selector: 'app-root',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row">
	    	  			<div class="col text-justify">
	                        <h1>Contact Us</h1>
	                        <div *ngIf='resErr' class="alert alert-danger" role="alert">
								{{resErr}}
							</div>
							<div *ngIf='resSuc' class="alert alert-success" role="alert">
								{{resSuc}}
							</div>
	                        <form #contactForm="ngForm" (ngSubmit)="submit(contactForm)">
	                        	<div class="form-row">
	                        		<div class="col-md-6 mb-3">
										<label>Name:</label>
										<input type="text" required [class.ng-submitted]="contactForm.submitted" class="form-control" placeholder="Name" ngModel name="name" #txtname="ngModel"/>
										<ng-container *ngIf="txtname.errors && (txtname.dirty || txtname.touched || contactForm.submitted)">
											<div class="invalid-feedback" *ngIf="txtname.errors?.required">
										        Name is required.
										    </div>
										</ng-container>
	                        		</div>
	                        		<div class="col-md-6 mb-3">
										<label>Email:</label>
										<input type="email" name="email" [class.ng-submitted]="contactForm.submitted" required ngModel class="form-control" placeholder="Email"  #txtemail="ngModel"/>
										<ng-container *ngIf="txtemail.errors && (txtemail.dirty || txtemail.touched || contactForm.submitted)">
											<div class="invalid-feedback" *ngIf="txtemail.errors?.required">
										        Email is required.
										    </div>
										</ng-container>
	                        		</div>
	                        	</div>
								<div class="form-group">
									<label>Subject:</label>
									<input type="email" name="subject" [class.ng-submitted]="contactForm.submitted" required ngModel class="form-control" placeholder="Subject"  #txtsubject="ngModel"/>
									<ng-container *ngIf="txtsubject.errors && (txtsubject.dirty || txtsubject.touched || contactForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtsubject.errors?.required">
									        Subject is required.
									    </div>
									</ng-container>
								</div>
								<div class="form-group">
									<label>Message:</label>
									<textarea  name="message" required [class.ng-submitted]="contactForm.submitted" ngModel class="form-control height-120" placeholder="Message" #txtmsg="ngModel"></textarea>
									<ng-container *ngIf="txtmsg.errors && (txtmsg.dirty || txtmsg.touched || contactForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtmsg.errors?.required">
									        Message is required.
									    </div>
									</ng-container>
								</div>
								<div class="form-group">
									<div class="g-recaptcha" data-sitekey="6Lef8FEUAAAAAEZpX-u9Ag3QkO6Z3wIohjWGh7YQ"></div>
								</div>
								<div class="form-group">
									<button class="btn theme-btn" name="submit">Send Request</button>
								</div>
							</form>
	                    </div>
		  			</div>
	  			</div>
	  		</main>`,
})
export class ContactPage {
	resErr:string = null;
	resSuc:string = null;
	constructor(private dataService: DataService) {

    }
    submit(form){
    	if(form.valid){
    		let recaptcha = (<HTMLInputElement>document.getElementById('g-recaptcha-response')).value;
    		this.dataService.post('web/contact',Object.assign(form.value,{recaptcha:recaptcha})).subscribe(res=>{
    			this.resSuc = res.msg;
    			this.resErr = null;
    			setTimeout(()=>{ this.resSuc = null; }, 3000);
    			form.resetForm();
    		},err =>{
    			this.resErr = err.error; 
    			setTimeout(()=>{ this.resErr = null; }, 10000);
    		});
    	}
    }
}
