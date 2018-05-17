import { Component, Input, EventEmitter, Output  } from '@angular/core';
import { Http } from '@angular/http';
import { AuthGuard } from '../providers/guard';
import { DataService } from '../providers/data';
import { Router } from '@angular/router';
import { parse , format, AsYouType } from 'libphonenumber-js';

@Component({
  selector: 'signup-widget',
  template: `
  			<div *ngIf='resErr' class="alert alert-danger" role="alert">
				{{resErr}}
			</div>
			<form #signupForm="ngForm">
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label>Email:</label>
							<input type="text" name="email" required ngModel class="form-control" placeholder="abc@xyz.com" [class.ng-submitted]="signupForm.submitted"  #txtemail="ngModel" />
							<ng-container *ngIf="txtemail.errors && (txtemail.dirty || txtemail.touched || signupForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtemail.errors?.required">
							        Email is required.
							    </div>
							</ng-container>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label>First name:</label>
							<input type="text" name="first_name" required ngModel class="form-control" [class.ng-submitted]="signupForm.submitted"  #txtfirstname="ngModel"/>
							<ng-container *ngIf="txtfirstname.errors && (txtfirstname.dirty || txtfirstname.touched || signupForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtfirstname.errors?.required">
							        First Name is required.
							    </div>
							</ng-container>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Last Name:</label>
							<input type="text" name="last_name" required ngModel class="form-control" [class.ng-submitted]="signupForm.submitted"  #txtlastname="ngModel"/>
							<ng-container *ngIf="txtlastname.errors && (txtlastname.dirty || txtlastname.touched || signupForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtlastname.errors?.required">
							        Last Name is required.
							    </div>
							</ng-container>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label>Mobile phone:</label>
							<input type="text" name="phone_number" required ngModel class="form-control" [class.ng-submitted]="signupForm.submitted"  #txtphone="ngModel" (keyup)="formatNumber($event)" [readonly]="step==2"/>
							<small class="form-text text-muted">include country code(eg. +1 999 999 999).</small>
							<ng-container *ngIf="txtphone.errors && (txtphone.dirty || txtphone.touched || signupForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtphone.errors?.required">
							        Mobile phone is required.
							    </div>
							</ng-container>
							<div class="invalid-feedback" *ngIf="phoneErr">
						        Oops! Mobile phone is Invalid.
						    </div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label>Password:</label>
							<input type="password" name="password" required ngModel class="form-control" placeholder="min 6 characters" [class.ng-submitted]="signupForm.submitted"  #txtpassword="ngModel"/>
							<ng-container *ngIf="txtpassword.errors && (txtpassword.dirty || txtpassword.touched || signupForm.submitted)">
								<div class="invalid-feedback" *ngIf="txtpassword.errors?.required">
							        Password is required.
							    </div>
							</ng-container>
						</div>
					</div>
				</div>
				<div class="row" *ngIf="step == 2">
					<div class="col-md-12">
						<div class="form-group">
							<label>Please enter in the verification code that was provided via text message.:</label>
							<input type="text" name="sms_code" ngModel class="form-control" placeholder="Enter confirmation code" />
							<a (click)="sendcode(signupForm)">Resend confirmation code</a>
						</div>
					</div>
				</div>
				<div class="form-group">
					<button *ngIf="step == 1" (click)="sendcode(signupForm)" class="btn theme-btn" name="submit">Next</button>
					<button *ngIf="step == 2" (click)="submit(signupForm)" class="btn theme-btn" name="submit">SignUp</button>
				</div>
				<div class="form-group">
					<button class="btn btn-link pl-0" (click)="loginEventFn($event)" >Already has account?</button>
				</div>	

			</form>`,
})
export class SignUpWidget {
	step:number = 1;
	code:number;
	country:string = null;

	resErr:string = null;
	phoneErr:boolean = false;

	@Output('signedInEvent') signedInEvent = new EventEmitter();
	@Output('loginEvent') loginEvent = new EventEmitter();

	constructor(private authService: AuthGuard,
		private dataService: DataService,
		protected http: Http,
		private router: Router) {

		
    }
    ngOnInit(){
    	if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((res)=>{
	        	this.getCountry(res.coords.latitude,res.coords.longitude).then((c)=>{
	        		this.country = c;
	        	});
	        });
	    } else {
	    	this.http.get('https:\/\/ipinfo.io\/json').subscribe(res => {
                let r = res.json();
                const [lat, lng] = r.loc.split(',');            
                this.getCountry(lat,lng).then((c)=>{
                	this.country = c;
	        	});
            },err => {});
	    }
    }
    loginEventFn(ev){
    	this.loginEvent.emit(ev);
    }
    submit(form){
    	if(form.valid && this.code == form.value.sms_code){
    		let data = Object.assign(form.value,{country:this.country});
    		this.authService.signup(data).subscribe(user=>{
    			this.signedInEvent.emit(user);
    			this.resErr = null;
    			// let country = window.location.pathname.replace(/^\/|\/$/g, '').split("/")[0];
    			// this.router.navigate(['/'+country+'/account']);
    		},err => {
    			this.resErr = err.error; 
    			setTimeout(()=>{ this.resErr = null; }, 10000);
    		});
    	}
    }
    sendcode(form){
    	let _parse = parse(form.value.phone_number);
    	if(form.valid && _parse.country){
    		this.phoneErr = false;
    		form.value.phone_number = format(form.value.phone_number, 'International');
    		this.dataService.post('signupcode',form.value).subscribe(res=>{
    			this.step = 2;
    			this.code = res.code;
    			 this.resErr = null;
    		},err=>{
    			this.resErr = err.error; 
    			setTimeout(()=>{ this.resErr = null; }, 10000);
    		});
    	}else if(!_parse.country){
    		this.phoneErr = true;
    	}
    }
    formatNumber(ev){
    	ev.target.value = new AsYouType().input(ev.target.value);
    	let _parse = parse(ev.target.value);
    	if(_parse.country){
    		this.phoneErr = false;
    	}
    }
    getCountry(lat,lng){
    	return new Promise<string>((resolve, reject) => {
	    	this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true').subscribe(res => {
	    		let r = res.json();
	    		if(r.status == 'OK'){
	    			var country = r.results[0].address_components.find(x => x.types.indexOf("country") > -1);
	    			resolve(country.short_name);
	    		}
	    	},err =>{
	    		resolve('US');
	    	});
	   	});
    }
}
