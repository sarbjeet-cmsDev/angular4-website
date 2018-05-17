import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../providers/guard';
declare var swal: any;

@Component({
  selector: 'login-widget',
  template: `
			<p>Please enter in your information.</p>
			<form #loginForm="ngForm">
				<div class="form-group">
					<label>Email:</label>
					<input type="text" name="email" required ngModel class="form-control" [class.ng-submitted]="loginForm.submitted"  #txtemail="ngModel" placeholder="abv@xyz.com"/>
					<ng-container *ngIf="txtemail.errors && (txtemail.dirty || txtemail.touched || loginForm.submitted)">
						<div class="invalid-feedback" *ngIf="txtemail.errors?.required">
					        Email is required.
					    </div>
					</ng-container>
				</div>
				<div class="form-group">
					<label>Password:</label>
					<input type="password" name="password" required ngModel class="form-control" placeholder="Password" [class.ng-submitted]="loginForm.submitted"  #txtpassword="ngModel"/>
					<ng-container *ngIf="txtpassword.errors && (txtpassword.dirty || txtpassword.touched || loginForm.submitted)">
						<div class="invalid-feedback" *ngIf="txtpassword.errors?.required">
					        Password is required.
					    </div>
					</ng-container>
				</div>
				<div class="form-group">
					<a [routerLink]="['/forgetpassword']" >Forget Password?</a>
				</div>	
				<div class="form-row">
					<div class="col-md-3">
						<button (click)="submit(loginForm)" class="btn theme-btn" name="submit">Login</button>
					</div>

					<div class="col-md-3">
						<button (click)="signup()" class="btn theme-btn" name="submit">Signup</button>
					</div>
				</div>
			</form>`,
})
export class LoginWidget {
	country:string = 'us';

	@Output('signUpEvent') signUpEvent = new EventEmitter();
	@Output('signedInEvent') signedInEvent = new EventEmitter();

	constructor(private authService: AuthGuard,
		private router: Router) {
		this.country = window.location.pathname.replace(/^\/|\/$/g, '').split("/")[0];
    }
    submit(form){
    	if(form.valid){
    		this.authService.login(form.value).subscribe(user=>{
    			this.signedInEvent.emit(user);
    		},err => {
    			swal("Error!", err.error, "error");
    		});
    	}
    }
    signup(){
    	this.signUpEvent.emit(true);
    }
}
