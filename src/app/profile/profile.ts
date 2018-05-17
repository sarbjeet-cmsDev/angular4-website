import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../providers/data';
import { AuthGuard } from '../providers/guard';
import * as moment from 'moment';
import _ from 'lodash';
declare var $:any;
declare var google: any;

@Component({
  selector: 'profile-page',
  template: `
  			<header-section></header-section>
  			<main>
  				<ng-container *ngIf='business'>
	  				<div class="container">
		  				<div class="row align-items-center">
			  				<div class="col-md-6 mt-3">
			  					<div class="row">
				  					<div class="col-md-3">
				  						<img class="b-logo" [src]="business.logo_url" />		
				  					</div>
				  					<div class="col-md-9">
				  						<h1>{{business.name}}</h1>
			  							<p>{{business.formatted_address}} {{business.region}}, {{business.country}} {{business.zipcode}}</p>
				  					</div>
			  					</div>
			  				</div>
			  				<div class="offset-md-2 col-md-2 mt-3">
			  					<mbsc-rating [(ngModel)]="business.rating_count" disabled="true" color="primary"></mbsc-rating>
			  				</div>
			  				<div class="col-md-2 mt-3">
			  					<button *ngIf="!isFavourite" (click)="alterFavourite(true)" class='btn btn-primary btn-block'><i class="fal fa-heart"></i> Add to favourite</button>
			  					<button *ngIf="isFavourite" (click)="alterFavourite(false)" class='btn btn-primary btn-block'><i class="fas fa-heart"></i> Your favourite</button>
			  				</div>
		  				</div>
	  				</div>
		  			<div class="container">
		                <div class="row">
		                	<div class="col-md-4 mt-3">
		                		<div id="sidebar" class='row'>
		                			<div class="col-md-12 ">
		                				<div class="profile-block map">
		                					<div id='map'></div>
		                				</div>
		                			</div>
									<div class="col-md-12 mt-3">
										<div class="profile-block location">
											<h5><i class="fas fa-map-marker-alt"></i> Location</h5>
											<strong>{{business.name | uppercase}}</strong>
											<p>
												{{business.formatted_address}}<br/>
												{{business.region}}, {{business.country}}<br/>
												{{business.zipcode}}
											</p>
											<h6><i class="fal fa-phone"></i> {{business.phone_number}}</h6>
			                			</div>	                		
		                			</div>	                		
		                			<div class="col-md-12 mt-3">
		                				<div class="profile-block availabilty">
											<h5><i class="fal fa-alarm-clock"></i> Opening Hours</h5>
											<div class="row" *ngFor="let day of getOpeningHours(business.availability)">
												<div class="col-md-5">{{ day.day }} </div>
												<div class="col-md-7">{{ day.open }} <i class="fal fa-angle-right"></i> {{ day.close }}</div>
											</div>
										</div>
		                			</div>	          
		                			<div class="col-md-12 mt-3">
		                				<div class="profile-block team">
											<h5><i class="fas fa-user"></i> Our Team</h5>
											<div class="row">
												<div class="col-md-4 mt-2 text-center" *ngFor="let staff of business.staff">
													<img [src]="staff.avatar_url" />	
													<span>{{ staff.name }}</span>							
												</div>
											</div>
			                			</div>	          
		                			</div>	          
		                		</div>
		                	</div>
		                	<div class="col-md-8 mt-3">
		                		<div class="row">
	  								<div class="col-md-12"><img class="b-banner" [src]="business.cover_image_url"/></div>
	  							</div>
	  							<div class="row">
	  								<div class="col-md-12 mt-1 b-overview" [style.height]="isOverviewCollapsable ? 75+'px' : 'auto'" [innerHTML]="business.overview">
	  								</div>
	  								<div class="col-md-12"><a *ngIf="business.overview.length > 300" (click)="isOverviewCollapsable =! isOverviewCollapsable">Read {{isOverviewCollapsable? 'more':'less'}}</a></div>
	  								<div class="col-md-12"><hr/></div>
	  							</div>
	  							<div class="row">
	  								<div class="col-md-12" *ngFor="let service of business.services">
										<div class="row mt-2 align-items-center">
											<div class="col-md-6">
												<h5 class='m-0'>{{service.title}}</h5>
											</div>
											<div class="col-md-6">
												<div class="row align-items-center" *ngFor="let option of service.options">
													<div class="col-md-4">
														{{ option.format_duration }}
													</div>
													<div class="col-md-4">
														{{ option.price | currency:business.currency }}
													</div>
													<div class="col-md-4">
														<button (click)="addService(option,service,true)" class="btn btn-primary btn-block">Rezerv</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-12"><hr/></div>
	  							</div>
	  							<div class="row">
	  								<business-review></business-review>
	  							</div>
	  							<div class="row">
	  								<business-work></business-work>
	  							</div>
		                	</div>
			  			</div>
		  			</div>
	  			</ng-container>
	  		</main>
			<div id="bookingModel" class="modal">
				<div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
					<div class="modal-content">
						<ng-container *ngIf="widget == 'booking'">
							<div class="modal-header">
								<h5 class="modal-title">Pick a Date & Time:</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="container-fluid">
									<div class="row">
										<div class="col-md-5">
											<mbsc-calendar (onSet)="onDateChange($event.inst.getVal())" [min]='today' display="inline" weeks="5" theme="ios"  [(ngModel)]="birthday">My Birthday</mbsc-calendar>
											<div class="row">
												<div class="col-md-12">
													<ng-container *ngIf="appointment.services.length">
														<div class="row mb-3 align-items-center b-service-row" *ngFor="let service of appointment.services;let i = index">
															<div class="col-md-3" (click)="changeStaff(i)">
																<img class="small" [src]="service.staff?.avatar_url" />
															</div>
															<div class="col-md-7">
																<small color='danger' *ngIf="service.waitingtime">Waiting Time: {{ service.waitingtime }}</small>
														    	<h5>{{service.title}} <small>with {{ service.staff?.name }}</small></h5>
														    	<p>
											  						<ng-container *ngIf="service.from">
											  							{{ service?.from | date:'shortTime' }} - {{ service?.to | date:'shortTime' }}
											  						</ng-container>
											  						<ng-container *ngIf="!service.from">
											  						Not Available
											  						</ng-container>
											  					</p>
															</div>
															<div class="col-md-2">
																<button class="btn btn-link" *ngIf="i > 0" (click)='removeService(service)'><i class="fal fa-times-circle"></i></button>
															</div>
														</div>
													</ng-container>
												</div>
											</div>
										</div>
										<div class="col-md-7">
											<div class="row">
												<div class="col-md-12">
													<ng-container *ngIf="slots.length">
														<h4>Available Booking Slot</h4>	
														<div class="row slots-block">
															<div class="col-md-4 text-center">
																<strong>Morning</strong><br/>
																<ng-container *ngFor="let slot of slots">
												  					<ng-container *ngIf='slot.is_available && slot.open < dayAfternoon'>
													  					<button class="btn btn-outline-primary btn-sm mb-1" (click)="setServiceTime(slot.open)">
													  						{{ slot.open | date:'shortTime' }}
													  					</button>
												  					</ng-container>
												  				</ng-container>
															</div>
															<div class="col-md-4 text-center">
																<strong>Afternoon</strong><br/>
																<ng-container *ngFor="let slot of slots">
												  					<ng-container *ngIf='slot.is_available && slot.open >= dayAfternoon && slot.open < dayEvening'>
													  					<button class="btn btn-outline-primary btn-sm mb-1" (click)="setServiceTime(slot.open)">
													  						{{ slot.open | date:'shortTime' }}
													  					</button>
												  					</ng-container>
												  				</ng-container>
															</div>
															<div class="col-md-4 text-center">
																<strong>Evening</strong><br/>
																<ng-container *ngFor="let slot of slots">
												  					<ng-container *ngIf='slot.is_available && slot.open >= dayEvening'>
													  					<button class="btn btn-outline-primary btn-sm mb-1" (click)="setServiceTime(slot.open)">
													  						{{ slot.open | date:'shortTime' }}
													  					</button>
												  					</ng-container>
												  				</ng-container>
															</div>
														</div>
													</ng-container>
												</div>
											</div>
											<div class="row">
												<div class="col-md-12">
													<button class="btn btn-primary" (click)="showServiceWidget()">
														Add Service
													</button>
													<button class="btn btn-primary" [disabled]="!isCheckoutValid()" (click)="rezerv()">
														Proceed
													</button>
												</div>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</ng-container>
						<ng-container *ngIf="widget == 'services'">
							<div class="modal-header">	
								<h5 class="modal-title">Select Service</h5>
							</div>
							<div class="modal-body">
								<div class="container-fluid">
									<div class="row">
										<div class="col-md-12" *ngFor="let service of business.services">
											<div class="row mt-2 align-items-center">
												<div class="col-md-4">
													<h5 class='m-0'>{{service.title}}</h5>
												</div>
												<div class="col-md-8">
													<div class="row align-items-center" *ngFor="let option of service.options">
														<div class="col-md-4">
															{{ option.format_duration }}
														</div>
														<div class="col-md-3">
															{{ option.price | currency:business.currency }}
														</div>
														<div class="col-md-5">
															<button (click)="addService(option,service)" class="btn btn-primary btn-block">Rezerv</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12"><hr/></div>
									</div>
								</div>
							</div>
						</ng-container>
						<ng-container *ngIf="widget == 'login'">
							<div class="modal-header">	
								<h5 class="modal-title">Login</h5>
							</div>
							<div class="modal-body">	
								<login-widget (signUpEvent)="signup($event)" (signedInEvent)="loggedIn($event)"></login-widget>
							</div>
						</ng-container>
						<ng-container *ngIf="widget == 'signup'">
							<div class="modal-header">	
								<h5 class="modal-title">Signup</h5>
							</div>
							<div class="modal-body">	
								<signup-widget (loginEvent)="login($event)" (signedInEvent)="loggedIn($event)"></signup-widget>	
							</div>
						</ng-container>
						

						<ng-container *ngIf="widget == 'confirm'">
							<div class="modal-header">	
								<h5 class="modal-title">Confirm Appointment</h5>
							</div>
							<div class="modal-body">
								<div class="container-fluid">
									<div class="row">
										<div class="col-md-12">
											<h4>{{ business.name }}</h4>
											<h4>{{appointment.on | date:'MMMM d, yyyy'}} at {{appointment.on | date:'h:mm a'}}</h4>	
										</div>
									</div>
									<div class="row" *ngFor="let option of appointment.services">
						  				<div class="col-md-5">
						  					<h5>{{option.title}}</h5>
						  				</div>
						  				<div  class="col-md-3">
						  					<small>{{ option.format_duration }}</small>
						  				</div>
						  				<div  class="col-md-4 text-right">
						  					<h5>{{option.price | currency:business.currency }}</h5>
						  				</div>
									</div>
									<div class="row mt-3">
						  				<div class="col-md-6">
						  					<h5>Tax:</h5>
						  				</div>
						  				<div  class="col-md-6 text-right">
						  					<h5>{{ appointment.tax | currency:business.currency }}</h5>
						  				</div>
						  				<div class="col-md-6">
						  					<h5>Total:</h5>
						  				</div>
						  				<div class="col-md-6 text-right">
						  					<h5>{{ appointment.total | currency:business.currency }}</h5>
						  				</div>
									</div>
									<div class="row">
										<div class="col-md-12">
							  				<button class='btn btn-primary' (click)='doAppointment()'>
												Rezerv Now
											</button>
											<button type="button" class="btn btn-danger">Back</button>
										</div>
									</div>
								</div>
							</div>
						</ng-container>

						<ng-container *ngIf="widget == 'success'">
							<div class="modal-body" style="background:#faa61a">	
								<div padding class='logo'>
								    <img width="250px" src="assets/img/logo-white.png"/>
								</div>
						  		<h1>All set!</h1>
						  		<h5>Don't worry your payment stays with us until your service is complete</h5>
						  		<p>if you or cancels before your appointment you get your money back immediately.</p>
								<button class="btn btn-primary" class="close" data-dismiss="modal" aria-label="Close">Ok GOT IT</button>
							</div>
						</ng-container>
					</div>
				</div>
			</div>`,
})
export class ProfilePage {
	user:any = {};
	business:any = null;
	widget:string = 'booking';
	today:Date = moment().toDate();
	slots:Array<any> = [];
	booking:Array<any> = [];
	favourites:Array<any> = [];

	appointmentDate:any = moment().toDate();
	dayMorning:Date = moment().set({hour:9,minutes:0}).toDate();
	dayAfternoon:Date = moment().set({hour:12,minutes:0}).toDate();
	dayEvening:Date = moment().set({hour:17,minutes:0}).toDate();


	minBookingTime:Date = moment().toDate();
	maxBookingTime:Date = moment().add(60,'day').toDate();

	isOverviewCollapsable:boolean = true;
	isFavourite:boolean = false;

	appointment:any = {
		paymentmethod:'cash',
		business_id:null,
		on:null,
		subtotal:0.0,
		total:0.0,
		tax:0.0,
		tip:0.0,
		discount:0,
		note:null,
		duration:0,
		service_tax:0,
		is_reschedule:1,
		services:[]
	};

	map: any; //MAP VARIABLE

	constructor(private dataService: DataService,
		private authGuard: AuthGuard,
		private route: ActivatedRoute) {

		this.authGuard.user.subscribe(user => this.user = user);
		this.authGuard.favourites.subscribe(favourites => {
			this.favourites = favourites;
			if(this.business) this.isFavourite = (this.favourites.filter(x => x == this.business.id)).length >= 1 ? true : false;
		});
    }
    ngOnInit(){
		this.route.params.subscribe(params => {
		   this.loadBusiness(params);
		});
	}
	alterFavourite(action){
		if(action){
			this.dataService.post('web/favourite/ids',{id:this.business.id}).subscribe(res=>{
				this.favourites.push(this.business.id);
				this.authGuard.favourites.next(this.favourites);
				this.isFavourite = true;
			});
		}else{
			this.dataService.delete('web/favourite/ids/'+this.business.id).subscribe(res=>{
				this.favourites = this.favourites.filter(x => x != this.business.id);
				this.authGuard.favourites.next(this.favourites);
				this.isFavourite = false;
			});
		}
	}
	loadMap(business){
		let mapOptions:any = {
			center: new google.maps.LatLng(business.latitude, business.longitude),
			zoom: 15,
			minZoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			fullscreenControl: false,
			streetViewControl: false,
			zoomControl: false,
		};
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var marker = new google.maps.Marker({
          position: new google.maps.LatLng(business.latitude, business.longitude),
          map: this.map,
          icon:{
			    url: 'http://api.rezervnow.com/icon/marker.png'
			}
        });
	}

	bookModel(){
		$('#bookingModel').modal('show');
	}
	showServiceWidget(){
		this.widget = 'services';
	}
	isCheckoutValid(){
		return (this.appointment.services.filter(i => i.error == true)).length == 0;
	}
	addService(option,service,showModel=false){
		let item = option;
		item.title = service.title;
		item.tax = service.tax;
		let staff = this.business.staff[0];
		item.staff = {
			id:staff.id,
			name:staff.name,
			avatar_url:staff.avatar_url,
		};
		let x = this.appointment.services.find(x => x.id == item.id);
		if(x){
			this.removeService(item);
		}
		this.appointment.services.push(item);
		this.initRezerv();
		this.widget = 'booking';

		if(showModel){
			this.bookModel();
		}
	}
	removeService(item){
		this.appointment.services = this.appointment.services.filter(x => x.id != item.id);
	}
	initRezerv(){
		let day = this.business.availability.find( d => d.day_of_week == moment(this.appointmentDate).day());
		if(day && !day.is_available){
			this.setServiceTime(null);
			this.slots = [];
		}
		else if(day.is_available){
			this.getBooking().subscribe(booking =>{
				this.booking = booking;
				let slots = this.getDayFreeSlot();

				console.log(slots);

				if(slots.length){
					this.slots = slots;
					if(this.appointment.services[0].from){
						this.setServiceTime(this.appointment.services[0].from);
					}
					else{
						this.setServiceTime(this.slots[0].open);
					}
				}else{
					this.slots = [];
					this.setServiceTime(null);
				}
			});
		}
	}
	rezerv(){
		console.log(this.appointment)
		if(!this.user){ //LOGIN IF NOT LOGGED IN
			this.widget = 'login';
		}else{
			this.goToConfirm();
		}
	}
	goToConfirm(){
		let subtotal = 0, tax = 0;
		for(let item of this.appointment.services){
			subtotal += item.price;
			if(item.tax > 0) tax += item.price * (item.tax)/100;
		}
		this.appointment.on = this.appointment.services[0].from;
		this.appointment.subtotal = subtotal;
		this.appointment.tax = tax;
		this.appointment.total = subtotal + tax;
		this.widget = 'confirm';
	}
	doAppointment(){
		this.dataService.post('user/appointment',this.appointment).subscribe((res)=>{
			this.widget = 'success';
		});
	}
	signup(){
		this.widget = 'signup';
	}
	login(){
		this.widget = 'login';
	}
	loggedIn(){ // DO APPOINTMENT
		this.goToConfirm();
	}
	getBooking(){
		return this.dataService.get('availability/'+this.business.id+'/'+moment(this.appointmentDate).format('YYYY-MM-DD')).map(booking => {
			if(this.appointment.id) booking = booking.filter(b => b.appointment_id != this.appointment.id);
			return booking;
		});
	}
	getDayFreeSlot(){ //Create Slot button to fit first item
		let staff = this.getStaff(this.appointment.services[0].staff.id);
		let booking = this.booking.filter(b => b.staff_id == staff.id);
		let slots = this.getSlots(staff.availability,booking);
		let serviceduration = this.appointment.services[0].duration;
		let response = [];
		for(let x = 0; x < slots.length; x++){
			let y = 0;
			if(slots[x].is_available == 1 && moment(slots[x].open).isAfter(this.minBookingTime) && moment(slots[x].close).isBefore(this.maxBookingTime)){
				for(let j = x; j < slots.length;j++){
					if(slots[j].is_available == 1){
						y += moment(slots[j].close).diff(slots[j].open,'seconds');
						continue;
					}
					break;
				}
				if(y >= serviceduration){
					response.push(slots[x]);
					y=0;
					continue;
				}
			}
		}
		return response;
	}
	getStaff(id){
		return this.business.staff.find(s => s.id == id);
	}
    loadBusiness(params){
    	this.dataService.get("web/business/"+params.business).subscribe(business => {
    		this.business = business;
    		this.appointment.business_id = business.id;
    		this.minBookingTime = this.getMinBookTime();
			this.maxBookingTime = this.getMaxBookTime();

			this.isFavourite = (this.favourites.filter(x => x == this.business.id)).length >= 1 ? true : false;

			setTimeout(()=>{this.loadMap(business)},1000);
    	});
    }
    onDateChange(date){
    	this.slots = [];
    	this.dayAfternoon = moment(date).set({hour:12,minutes:0}).toDate();
		this.dayEvening = moment(date).set({hour:17,minutes:0}).toDate();

		this.appointmentDate = moment(date).toDate();
		this.initRezerv();
	}
    setServiceTime(from){
		if(this.appointment.services.length){
			let index =0;
			for(let service of this.appointment.services){
				if(index == 0){
					service.from = from;
				}
				else if(index > 0){
					service.from = this.appointment.services[index-1].to;
				}
				if(service.from){
					service.from = moment(this.appointmentDate).clone().set({
						hour:moment(service.from).get('hour'),
						minutes:moment(service.from).get('minutes')
					});
					service.waitingtime = null;
					let a = this.getAvailabilty(this.getStaff(service.staff.id),service);
					if(a.isAvailable){
						service.error = false;
						service.from = a.from;
						service.to = moment(service.from).add(service.duration,'seconds').toDate();
						if(index != 0){
							let w = moment(service.from).diff(this.appointment.services[index-1].to,'seconds');
							service.waitingtime = Math.floor(w / (60 * 60)) +"h"+Math.floor((w % (60 * 60)) / 60)+"min";
						}
						index++;
						continue;
					}
				}
				service.from = null;
				service.to = null;
				service.error = true;
				index++;
			}
		}			
	}
	changeStaff(index){
		// let service = _.cloneDeep(this.appointment.services[index]);
		// if(index != 0){
		// 	service.from = this.appointment.services[index-1].to;
		// }
		// let staff = this.business.staff.map( staff => {
		// 	staff.availabilty = this.getAvailabilty(staff,service);
		// 	return staff;
		// });
		// let staffModal = this.modalCtrl.create(UserRezervStaff, {staff:staff});
		// staffModal.onDidDismiss(staff => {
		// 	if(staff){
		// 		this.appointment.services[index].staff = staff;
		// 		this.initRezerv();
		// 	}
		// });
		// staffModal.present();
	}
	getSlots(availability,booking){
		let slots = [];
		let day = availability.find( d => d.day_of_week == moment(this.appointmentDate).day());
		if(day && day.is_available){
			const [openhours, openminutes] = day.slots[0].open.split(':');
			let dayOpen = moment(this.appointmentDate).set({hour:openhours,minute:openminutes });
			const [closehours, closeminutes] = day.slots[day.slots.length-1].close.split(':');
			let dayClose = moment(this.appointmentDate).set({hour:closehours,minute:closeminutes });
			while(dayOpen < dayClose){
				let open = dayOpen.format('YYYY-MM-DD HH:mm:00');
				let close = moment(open).add(15,'minutes').format('YYYY-MM-DD HH:mm:00');
				let is_available = 1;
				for(let b of booking){
					if(moment(open).isBetween(b.from,b.to) || moment(close).isBetween(b.from,b.to)){
						is_available = 0;break;
					}
				}
				slots.push({
					open:moment(open).toDate(),
					close:moment(close).toDate(),
					is_available:is_available
				});
				dayOpen = dayOpen.add(15,'minutes');
			}
		}
		return slots;
	}
	getAvailabilty(staff,service){
		let response = {isAvailable:false,message:'Not Available',error:true,from:null};
		let staffday = staff.availability.find( d => d.day_of_week == moment(this.appointmentDate).day());
		if(!staffday || !staffday.is_available) return {isAvailable:false,message:"Not Working Today",error:true,from:null};

		const [openhours, openminutes] = staffday.slots[0].open.split(':');
		let dayOpen = moment(this.appointmentDate).set({hour:openhours,minute:openminutes,second:0 }).format('YYYY-MM-DD HH:mm:00');
		const [closehours, closeminutes] = staffday.slots[staffday.slots.length-1].close.split(':');
		let dayClose = moment(this.appointmentDate).set({hour:closehours,minute:closeminutes,second:0 }).format('YYYY-MM-DD HH:mm:01');

		let sfrom;
		if(!service.from){
			sfrom = moment(dayOpen);
		}else{
			sfrom = moment(service.from);
		}
		let sto = sfrom.clone().add(service.duration,'seconds').set({second:0});

		if(sfrom.isBefore(dayOpen)) return {isAvailable:false,message:"Available from "+dayOpen,error:true,from:null};
		if(sto.isAfter(dayClose)) return {isAvailable:false,message:"Available Upto "+dayClose,error:true,from:null};

		let booking = this.booking.filter(b => b.staff_id == staff.id && moment(b.from).isSame(sfrom, 'day'));
		let emptyTimeSlot = [];

		if(booking.length){
			for(let c = 0;c < booking.length;c++){
				if( c == 0 ){ 
					emptyTimeSlot.push({open:dayOpen,close:booking[c].from});
				}
				if( c != 0 ){
					emptyTimeSlot.push({open:moment(booking[c-1].to).format('YYYY-MM-DD HH:mm:00'),close:booking[c].from});
				}
				if( c == booking.length-1 ){ 
					emptyTimeSlot.push({open:moment(booking[c].to).format('YYYY-MM-DD HH:mm:00'),close:dayClose});
				}
			}
			if(emptyTimeSlot.length){
				for(let emptyslot of emptyTimeSlot){
					if(sfrom.isSameOrAfter(emptyslot.open) && sto.isSameOrBefore(emptyslot.close)){
						response = {
							isAvailable:true,
							message:'Available',
							from:sfrom.toDate(),
							error:false
						};
						break;
					}
					let slotDuration = moment(emptyslot.close).diff(emptyslot.open, 'seconds');
					if(slotDuration >= service.duration && moment(emptyslot.open).isAfter(sfrom)){
						response = {
							isAvailable:true,
							message:'Available From '+moment(emptyslot.open).format('hh:mm a'),
							from:moment(emptyslot.open).toDate(),
							error:false
						};
						break;
					}
				}		
			}
		}else{
			response = {
				isAvailable:true,
				message:'Available',
				from:sfrom.toDate(),
				error:false
			};
		}
		return response;
	}
	getOpeningHours(availability){
		let rtrn = [];
		for(let day of availability){
			let a = day.slots;
			let open = moment(a[0].open, 'HH:mm:ss').format('hh:mm A');
			let close = moment(a[a.length-1].close, 'HH:mm:ss').format('hh:mm A');
			if(rtrn.length && open == rtrn[rtrn.length-1].open && close == rtrn[rtrn.length-1].close)
			{
				let z = ((rtrn[rtrn.length-1].day).split('-'))[0];
				rtrn[rtrn.length-1].day = z + "-" + day.day;
			}else{
				rtrn.push({
					day:day.day,
					open:open,
					close:close
				});
			}
		}
		return rtrn;
	}
    getMinBookTime(){
		let booking_before_setting = this.business.settings.find(s=> s.key == 'booking_before');
		if(booking_before_setting){
			let booking_before = JSON.parse(booking_before_setting.value);
			return moment().add(booking_before.value,booking_before.unit).toDate();
		}	
		return null;
	}
	getMaxBookTime(){
		let booking_upto_setting = this.business.settings.find(s=> s.key == 'booking_upto');
		if(booking_upto_setting){
			let booking_upto = JSON.parse(booking_upto_setting.value);	
			return moment().add(booking_upto.value,booking_upto.unit).toDate();
		}	
		return null;
	}
}
