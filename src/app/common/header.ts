import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../providers/guard';
import { RegionService } from '../providers/region';
declare var $:any;

@Component({
  selector: 'header-section',
  template: `
  		<header class='pb-3'>
			<div class="container">
				<div class="row align-items-center">
					<div class="col-md-3">
						<a [routerLink]="['/']"><img src="assets/img/logo.png" width="100%"></a>
					</div>
					<div class="offset-md-3 col-md-3 text-right">
						<button [routerLink]="['/business']" class="btn btn-outline-primary">
							For Business
						</button>
						<button *ngIf='region' (click)="showRegionPopup()" class="btn btn-outline-primary">
							{{region.title}}
						</button>
					</div>

					<div class="col-md-3 text-right">
						<ng-container *ngIf='!user'>
							<a [routerLink]="['/login']">Sign In / Sign Up</a>
						</ng-container>
						<ng-container *ngIf='user'>
							<ul class="nav justify-content-end">
								<li class="nav-item dropdown">
									<a class="nav-link dropdown-toggle p-0" data-toggle="dropdown">
										<img [src]="user.avatar_url" width="50px" height='50px' />
										{{ user.name }}
									</a>
									<div class="dropdown-menu">
								        <a class="dropdown-item" [routerLink]="['/account']">Account</a>
								      	<a class="dropdown-item" [routerLink]="['/booking']">Appointments</a>
								      	<a class="dropdown-item" [routerLink]="['/favourite']">Favourites</a>
								      	<a class="dropdown-item" [routerLink]="['/reviews']">Reviews</a>
								      	<a class="dropdown-item" (click)="logout()">logout</a>
									</div>
								</li>
							</ul>
						</ng-container>
					</div>
				</div>
			</div>
		</header>
		<div class="modal fade" id="regionPopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		    <div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h5 class="modal-title" id="exampleModalLabel">Select your region</h5>
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		                    <span aria-hidden="true">&times;</span>
		                </button>
		            </div>
		            <div class="modal-body">
		                <div class="container-fluid">
		                	<div class="row region mt-3 pb-3" *ngFor="let region of regions">
		                		<div class="col-md-3 pl-0">
		                			<strong>{{region.region}}</strong>
		                		</div>
		                		<div class="col-md-9">
			                		<div class="row">
				                		<div class="col-md-4 mb-2" *ngFor="let area of region.area">	
				                			<a (click)="regionSelected(area)"><img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/1x1/{{ area.code | lowercase }}.svg" width="20px" /> {{ area.title }}</a>
				                		</div>
			                		</div>
		                		</div>
		                	</div>
		            	</div>
		            </div>
		        </div>
		    </div>
		</div>`,
})
export class HeaderSection {
	user:any = null;
	region:any = null;
	country:string = null;

	capital:any = {us:'United State',in:'India'};

	regions:Array<any> = [
		{
			region:'Africa',
			area:[
				{code:'ZA',title:'South Africa'}
			]
		},
		{
			region:'Asia',
			area:[
				{code:'HK',title:'Hong Kong'},	
				{code:'IN',title:'India'},	
				{code:'JP',title:'Japan'},	
				{code:'MY',title:'Malaysia'},	
				{code:'PH',title:'Philippines'},	
				{code:'SG',title:'Singapore'}
			]
		},
		{
			region:'Australia',
			area:[
				{code:'AU',title:'Australia'}
			]
		},
		{
			region:'Europe',
			area:[
				{code:'DK',title:'Denmark'},
				{code:'FI',title:'Finland'},
				{code:'FR',title:'France'},
				{code:'DE',title:'Germany'},
				{code:'IE',title:'Ireland'},
				{code:'IT',title:'Italy'},
				{code:'NL',title:'Netherlands'},
				{code:'PL',title:'Poland'},
				{code:'PT',title:'Portugal'},
				{code:'RU',title:'Russia'},
				{code:'ES',title:'Spain'},
				{code:'SE',title:'Sweden'},
				{code:'GB',title:'United Kingdom'}
			]
		},
		{
			region:'North America',
			area:[
				{code:'CA',title:'Canada'},
				{code:'MX',title:'Mexico'},
				{code:'US',title:'United States'}
			]
		},
		{
			region:'South America',
			area:[
				{code:'AR',title:'Argentina'},
				{code:'BR',title:'Brazil'},
				{code:'CO',title:'Colombia'},
				{code:'VE',title:'Venezuela'}
			]
		}	
	];

	constructor(private authService: AuthGuard,
		private regionService: RegionService,
		private router: Router){
		
	    regionService.region.subscribe(region => this.region = region);
	    authService.user.subscribe(user => this.user = user);
    }
    ngAfterViewInit(){
    	$('.dropdown-toggle').dropdown();
    }
	showRegionPopup(){
		$('#regionPopup').modal('show');
	}
	regionSelected(region){
		$('#regionPopup').modal('toggle');
		this.regionService.region.next(region);
		this.router.navigate(['/home']);
	}
	logout(){
		this.authService.logout();
		this.router.navigate(['/home']);
	}
}
