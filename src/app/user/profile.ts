import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { ImageService } from '../providers/image';
import { AuthGuard } from '../providers/guard';
import { parse , format, AsYouType } from 'libphonenumber-js';


import * as moment from 'moment';
@Component({
  selector: 'user-profile-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container" *ngIf='user'>
	                <div class="row pb-5">
	    	  			<div class="col-md-4 mt-5">
	                        <user-menu></user-menu>
	                    </div>
	                    <div class="col-md-8 mt-5">
	                    	<form #profileForm="ngForm" (ngSubmit)="submit(profileForm)">
								<!-- General Information -->
								<div class="row">
									<div class="col">
										<h4>Edit Account Information</h4>
									</div>
								</div>
								<div *ngIf='resErr' class="alert alert-danger" role="alert">
									{{resErr}}
								</div>
								<div *ngIf='resSuc' class="alert alert-success" role="alert">
									{{resSuc}}
								</div>
								<div class="row">
									<div class="col-md-3 profile-image">
										<div class="row">
											<div class="col-md-12 text-center">
												<img src="{{ user.avatar_url }}" width="100px" class="img-responsive img-circle edit-avater" alt="" />
											</div>
											<div class="col-md-12 text-center">
												<label for="profilepic">
													<input id="profilepic" (change)="uploadProfilePic($event)" type="file" [hidden]="true" accept=".png,.jpg" />Change
												</label>
											</div>
										</div>
									</div>
									<div class="col-md-9">
										<div class="form-row">
											<div class="form-group col-md-6">
												<label>First Name</label>
												<input type="text" class="form-control" required name='first_name' [ngModel]="user.first_name">
											</div>
											<div class="form-group col-md-6">
												<label>Last Name</label>
												<input type="text" class="form-control" required name='last_name' [ngModel]="user.last_name">
											</div>
										</div>
										<div class="form-group">
											<label>Email</label>
											<input type="text" class="form-control" required name='email' [ngModel]="user.email" [readonly]="step==2">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<div class="form-group">
											<label>Phone</label>
											<input type="text" class="form-control" #txtphone='ngModel' required name='phone_number' [ngModel]="user.phone_number" (keyup)="formatNumber($event)" [readonly]="step==2">
											<ng-container *ngIf="txtphone.errors && (txtphone.dirty || txtphone.touched || profileForm.submitted)">
												<div class="invalid-feedback" *ngIf="txtphone.errors?.required">
											        Phone Number is required.
											    </div>
											</ng-container>
											<div class="invalid-feedback" *ngIf="phoneErr">
										        Oops! Mobile phone is Invalid.
										    </div>
										</div>
										<div class="form-group">
											<label>DOB</label>
											<mbsc-date name='Sdsd' [max]='maxDob' hidden #dobMobi="mobiscroll" (onSet)="birthdaySet(dobMobi.instance.getVal())"></mbsc-date>
											<div class="input-group">
												<input type="hidden" name='dob' [ngModel]="user.dob" #dob="ngModel" />
												<input readonly (click)="dobMobi.instance.show()" type="text" [value]="user.dob | date:'mediumDate'" class="form-control">
												<div class="input-group-append" (click)="dobMobi.instance.show()">
										          <div class="input-group-text"><i class="fal fa-calendar-alt"></i></div>
										        </div>
											</div>
										</div>
									</div>
								</div>

								<!-- End General Information -->

								<div class="row">
									<div class="col">
										<h3>Change Password</h3>
										<p>Remember, Your Password should not be easy and common</p>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<div class="form-row">
											<div class="form-group col-md-6">
												<label>Old Password</label>
											<input type="password" class="form-control" name="old_password" [(ngModel)]="old_password" placeholder="*********">
											</div>
											<div class="form-group col-md-6">
												<label>New Password</label>
											<input type="password" class="form-control" name="password" [(ngModel)]="password" placeholder="*********">
											</div>
										</div>
									</div>
								</div>
								
									
								<!-- Edit Location -->

								<div class="row">
									<div class="col">
										<h3>Edit Location</h3>
										<p>Write Address Information about your listing Location</p>
									</div>
								</div>
								<div class="row" ngModelGroup="address"  #addressCtrl="ngModelGroup">
									<div class="col">
										<div class="form-row">
											<div class="form-group col-md-6">
												<label>Address</label>
												<input type="text" class="form-control" name='street_address' [ngModel]="user.address.street_address">
											</div>
											<div class="form-group col-md-6">
												<label>City</label>
												<input type="text" class="form-control" name='city' [ngModel]="user.address.city">
											</div>
										</div>
										<div class="form-row">
											<div class="form-group col-md-6">
												<label>State</label>
												<input type="text" class="form-control" name='region' [ngModel]="user.address.region">
											</div>
											<div class="form-group col-md-6">
												<label>Country</label>
												<input type="text" readonly class="form-control" name='country' [ngModel]="user.address.country">
											</div>
										</div>
										<div class="form-row">
											<div class="form-group col-md-6">
												<label>Zip-Code</label>
												<input type="text" class="form-control" name='zipcode' [ngModel]="user.address.zipcode">
											</div>
										</div>
									</div>
								</div>
								<!-- End Edit Location -->
								<div class="row">
									<div class="col" *ngIf="step==1">
										<button type="submit" class="btn theme-btn" name="submit">Update Profile</button>
									</div>
									<div class="col" *ngIf="step==2">
										<div class="form-group">
											<label>Please enter in the verification code that was provided via text or email message.:</label>
											<input required type="text" name="otp" #otp="ngModel" ngModel class="form-control" placeholder="Enter confirmation code" />
										</div>
										<ng-container *ngIf="otp.errors && (otp.dirty || otp.touched || profileForm.submitted)">
											<div class="invalid-feedback" *ngIf="otp.errors?.required">
										        OTP is required.
										    </div>
										</ng-container>
										<button type="button" (click)="validateOTP(profileForm)" class="btn theme-btn">Submit Otp</button>
									</div>
								</div>
							</form>
	                    </div>
		  			</div>
	  			</div>
	  		</main>`,
})
export class UserProfilePage {
	user:any = {};
	maxDob:Date = moment().subtract(10,'years').toDate();

	code:number;

	resErr:string = null;
	resSuc:string = null;
	phoneErr:boolean = false;

	step:number = 1;

	constructor(private dataService: DataService,
		private imageService: ImageService,
		private authService: AuthGuard) {

		authService.user.subscribe(user => this.user = user);

		// this.dataService.get('/web/islogged').subscribe(user => {
		// 	this.user = user;
		// 	console.log(user);
		// });
    }
    birthdaySet(dob) {
    	this.user.dob = moment(dob).format('YYYY-MM-DD');
    }
    formatNumber(ev){
    	ev.target.value = new AsYouType(this.user.country).input(ev.target.value);
    	let _parse = parse(ev.target.value);
    	if(_parse.country){
    		this.phoneErr = false;
    	}
    }
    submit(form){
    	
    	if(form.valid){
    		let _parse = parse(form.value.phone_number);
    		if(form.valid && _parse.country){
    			form.value.phone_number = format(form.value.phone_number, 'International');
	    		this.phoneErr = false;

	    		if(form.value.phone_number != this.user.phone_number){
	    			this.dataService.post('sendcode',{
	    				phone_number:form.value.phone_number
	    			}).subscribe(res=>{
	    				this.code = res.code;
	    				this.step = 2;
					},err=>{
						this.resErr = err.error; 
						setTimeout(()=>{ this.resErr = null; }, 10000);
					});    			
	    		}else if(form.value.email != this.user.email){
	    			this.dataService.post('sendcode',{
	    				email:form.value.email
	    			}).subscribe(res=>{
	    				this.step = 2;
						this.code = res.code;
					},err=>{
						this.resErr = err.error; 
						setTimeout(()=>{ this.resErr = null; }, 10000);
					}); 
	    		}else{
	    			this.updateProfile(form);
	    		}
    		}
    		else if(!_parse.country){
	    		this.phoneErr = true;
	    	}
    	}
    }
    validateOTP(form){
    	if(form.value.otp == this.code){
    		this.updateProfile(form);
    	}
    }
  	updateProfile(form){
		this.dataService.post('/web/user/profile',form.value).subscribe(user=>{
			this.authService.user.next(user);
			this.resSuc = "Profile Saved!";
			this.step = 1;
			setTimeout(()=>{ this.resSuc = null; }, 10000);
		},err=>{
			this.resErr = err.error; 
			setTimeout(()=>{ this.resErr = null; }, 10000);
		});
  	}
  	uploadProfilePic(event){
	    if(event.target.files.length > 0) {
	        var data = new FormData();
			data.append('avatar', event.srcElement.files[0]);
			this.imageService.upload(data).subscribe(user=>{
				this.authService.user.next(user);
				this.resSuc = "Profile Saved!";
				this.step = 1;
				setTimeout(()=>{ this.resSuc = null; }, 10000);
			},err=>{
				this.resErr = err.error; 
				setTimeout(()=>{ this.resErr = null; }, 10000);
			});
	    }
  	}
}
