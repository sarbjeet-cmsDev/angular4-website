import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../providers/data';
declare var swal: any;
@Component({
  selector: 'signup-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	                <div class="row justify-content-md-center">
		                <div class="col-6 mt-5">
		                	
		                	<form #forgetForm="ngForm" [hidden]="step != 1">
		                		<p>Please enter in your account Email.</p>
								<div class="form-group">
									<label>Email:</label>
									<input type="text" name="email" required ngModel class="form-control" [class.ng-submitted]="forgetForm.submitted"  #txtemail="ngModel" placeholder="abv@xyz.com"/>
									<ng-container *ngIf="txtemail.errors && (txtemail.dirty || txtemail.touched || forgetForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtemail.errors?.required">
									        Email is required.
									    </div>
									</ng-container>
								</div>
								<div class="form-group">
									<button (click)="sendcode(forgetForm)" class="btn theme-btn" name="submit">Next</button>
								</div>
							</form>


							<form #ccForm="ngForm" *ngIf="step == 2">
								<p>Please enter in the verification code that was provided via text message.</p>
								<div class="form-group">
									<input type="text" name="sms_code" required ngModel #txtcode="ngModel" class="form-control" placeholder="Enter confirmation code" />
									<a (click)="sendcode(forgetForm)">Resend confirmation code</a>

									<ng-container *ngIf="txtcode.errors && (txtcode.dirty || txtcode.touched || ccForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtcode.errors?.required">
									        OTP is required.
									    </div>
									</ng-container>
								</div>
								<div class="form-group">
									<button (click)="matchCode(ccForm)" class="btn theme-btn" name="submit">Next</button>
								</div>
							</form>

							<form #resetForm="ngForm" *ngIf="step == 3">
								<p>Please enter new password.</p>
								<div class="form-group">
									<label>Password:</label>
									<input type="password" name="password" required [(ngModel)]="password" class="form-control" [class.ng-submitted]="resetForm.submitted"  #txtpassword="ngModel"/>
									<ng-container *ngIf="txtpassword.errors && (txtpassword.dirty || txtpassword.touched || resetForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtpassword.errors?.required">
									        Password is required.
									    </div>
									</ng-container>
								</div>
								<div class="form-group">
									<label>Confirm Password:</label>
									<input type="password" name="cpassword" required [(ngModel)]="cpassword" class="form-control" [class.ng-submitted]="resetForm.submitted"  #txtcpassword="ngModel"/>
									<ng-container *ngIf="txtcpassword.errors && (txtcpassword.dirty || txtcpassword.touched || resetForm.submitted)">
										<div class="invalid-feedback" *ngIf="txtcpassword.errors?.required">
									        Confirm Password is required.
									    </div>
									</ng-container>
									<ng-container *ngIf="resetForm.submitted && txtcpassword.value != txtpassword.value">
										<div class="invalid-feedback">
									        Passwords not matching.
									    </div>
									</ng-container>
								</div>

								<div class="form-group">
									<button (click)="reset(resetForm,forgetForm)" class="btn theme-btn" name="submit">Reset Password</button>
								</div>
							</form>

		    	  		</div>
	    	  		</div>
	  			</div>
	  		</main>`,
})
export class ForgetPasswordPage {
	step:number = 1;
	country:string = 'us';
	ccode:string = null;
	constructor(private dataService: DataService,
		private router: Router) {
		this.country = window.location.pathname.replace(/^\/|\/$/g, '').split("/")[0];
    }
    reset(form,forgetForm){
    	if(form.valid && form.value.password == form.value.cpassword){
    		let data = Object.assign(form.value,forgetForm.value);
    		this.dataService.post('web/resetpassword',data).subscribe(res=>{
    			this.router.navigate(['/login']);
    		},err=>{
    			
    		});
    	}
    }
    matchCode(form){
    	if(form.value.sms_code == this.ccode){
    		this.step = 3;
    	}
    }

    sendcode(form){
    	if(form.valid){
    		this.dataService.post('/web/emailotp',form.value).subscribe(res=>{
    			this.step = 2;
    			this.ccode = res.code;
    		},err=>{
    			swal("Error!", err.error, "error");
    		});
    	}
    }
}
