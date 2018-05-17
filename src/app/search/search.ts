import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../providers/data';
import { UtilService } from '../providers/util';
import { RegionService } from '../providers/region';

declare var google: any;
declare var $: any;

import _ from 'lodash';
@Component({
  selector: 'search-page',
  template: `
  			<header-section></header-section>
  			<main>
	  			<div class="container">
	  				<div class="row">
	  					<div class='col mt-3'>
	  						<p> <i class="fal fa-home"></i> <i class="fal fa-angle-right"></i> Search</p>
	  					</div>
	  				</div>
	  			</div>
	  			<div class="container">
	                <div id="main-content" class="row main">
	                	<div  id="sidebar" class='col-md-3 sidebar'>
		                	<div class='sidebar__inner'>
		                		<div class="search-filter">
		                			<div id='map'></div>
		                			<h5><i class="fas fa-map-marker-alt"></i>Location</h5>
		                			<h5 (click)="setLocation(location.parent)">
		                				<i class="fal fa-check"></i> {{ location.parent?.title || location.current?.title }} <i class="fas fa-level-up-alt float-right"></i>
		                			</h5>
									<ul>
										<li *ngFor="let location of location.data" (click)="setLocation(location)">
											{{ location.title }} ({{ location.count }})
										</li>
									</ul>
		                		</div>
		                		<div class="search-filter mt-3" *ngIf="categories.length">
		                			<h5><i class="fal fa-cut"></i>Top Categories</h5>
									<ul>
										<li *ngFor="let cat of categories"  (click)="setCategory(cat.id)">
											<a>
												<i class="fal fa-square" [hidden]="category.indexOf(cat.id) != -1"></i>
												<i class="fal fa-check" [hidden]="category.indexOf(cat.id) == -1"></i>
												{{ cat.title }} ({{ cat.count }})
											</a>
										</li>
									</ul>
		                		</div>
		                		<div class="search-filter mt-3">
		                			<h5><i class="fas fa-star"></i>Rating</h5>
									<ul>
										<li *ngFor="let _rating of rating" (click)="setRating(_rating.rating)">
											<a>
												<i class="fal fa-square" [hidden]="byrating.indexOf(_rating.rating) != -1"></i>
												<i class="fal fa-check" [hidden]="byrating.indexOf(_rating.rating) == -1"></i>

												<i *ngFor="let item of createRange(_rating.rating);" class="fas fa-star"></i> ({{ _rating.count }})
											</a>
										</li>
									</ul>
		                		</div>
		                	</div>
	                	</div>
	                	<div id="content" class='col-md-9 content'>

		                	<div class='row' *ngIf='!loading'>
		                		<div class='col'>
		                			<h4>Total Result found {{totalResult}}</h4>
		                		</div>
		                	</div>
		                	<div class='row'>
		                		<div class="col-md-6 mb-3 business-block" *ngFor="let business of businesses">
									<div class='row'>
										<div class='col-md-12 business-image-block'>
											<img src="{{ business.cover_image_url }}" alt="">
											<div class="static">
												<h4><a [routerLink]="['/business/'+business.url_key]">{{ business.name }}</a></h4>
												<p class="listing-location m-0">{{ business.formatted_address }}</p>
												<a [routerLink]="['/business/'+business.url_key]" class="book">Book Now</a>
											</div>
										</div>
										<div class='col-md-12'>
											<div class='business-block'>
												<div class="row m-0 mt-2 mb-2"  *ngFor="let service of business.services">
													<div class='col-md-4'>
														<strong>{{ service.title }}</strong>
													</div>
													<div class='col-md-3'>
														{{ service.options[0].format_duration }}
													</div>
													<div class='col-md-5 text-right'>
														<small>start from</small> {{ service.options[0].price | currency:business.currency }}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col text-center no-result" *ngIf="!businesses.length && !loading">
									<i class="fal fa-frown"></i>
									<h3>Your search did not match any documents.</h3>
									<p>Make sure that all words are spelled correctly. Try different or more general keywords.</p>
								</div>
		                	</div>
		                	<div class="row" *ngIf='pages.length > 1'>
								<div class="col-md-12">
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
	  		</main>
			`,
})
export class SearchPage {
	businesses:Array<any> = [];

	region:any = null;

	//Pagination Variable
	totalResult:number = 0;
	currentPage:number = 1;
	lastPage:number = 1;
	pages:Array<any> = [];

	//ReQuest Parameters
	requestParams:any;

	categories:Array<any> = [];
	rating:Array<any> = [];
	location:any = {};
	category:Array<number> = [];
	byrating:Array<number> = [];
	loading:boolean = true;
	map: any;
	markers:Array<any> = [];

	constructor(private dataService: DataService,
		private regionService: RegionService,
		private utilService: UtilService,
		private route: ActivatedRoute) {	

		regionService.region.subscribe(region => {
			this.region = region
		});
    }
    ngAfterViewInit(){
    	this.loadMap();
    }
    ngOnInit(){
    	this.route.params.subscribe(params => {
    		if(params.category){
    			this.utilService.getCats().subscribe(categories => {
    				let c = categories.find(x =>x.url_key == params.category);
    				this.category.push(c.id);
    				this.loadlisting({
	    				country:this.region.code,
	    				category:[c.id],
	    			});	
		        });
    		}else{
    			let l = new URL(document.location.toString());
    			let params = l.searchParams;
				let zipcode = params.get("zipcode");
				let location = params.get("location");
				let region = params.get("region");
				if(zipcode && zipcode.length) this.loadlisting({zipcode:zipcode});
				else if(location && location.length) this.loadlisting({city:location});
				else if(region && region.length) this.loadlisting({region:region});
				else this.loadlisting({country:this.region.code});
    		}
    	});
	}
	setLocation(location){
		if(!location.code){
			this.loadlisting({country:this.region.code});
		}else{
			this.loadlisting(Object.assign(location,{category:this.category},{rating:this.byrating}));	
		}
	}
	setCategory(id){
		if(this.category.indexOf(id) == -1) this.category.push(id);
		else this.category = this.category.filter(x => x != id);
		this.loadlisting(Object.assign(this.location.current,{category:this.category},{rating:this.byrating}));
	}
	setRating(rate){
		if(this.byrating.indexOf(rate) == -1) this.byrating.push(rate);
		else this.byrating = this.byrating.filter(x => x != rate);
		this.loadlisting(Object.assign(this.location.current,{category:this.category},{rating:this.byrating}));
	}

	loadPage(page){
    	if(page != '...') this.loadlisting(this.requestParams,page);
    }

    loadlisting(params,page=1){
    	this.requestParams = params;
    	this.loading = true;
    	this.dataService.post("web/listing?page="+page,params).subscribe(res => {
    		this.businesses = res.businesses.data;
    		/*Pagination*/
    		this.pages = this.pagination(res.businesses.current_page,res.businesses.last_page);
    		this.totalResult = res.businesses.total;
    		this.lastPage = res.businesses.last_page;
    		this.currentPage = res.businesses.current_page;

    		this.categories = res.categories;
    		this.rating = res.rating;
    		this.location = res.location;
    		this.addMapLocation();
    		this.loading = false;
    	});
    }

    loadMap(){
		let mapOptions:any = {
			zoom: 6,
			minZoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			fullscreenControl: false,
			streetViewControl: false,
			zoomControl: false,
		};
		this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}
	addMapLocation(){
		for (var i = 0; i < this.markers.length; i++) {
        	this.markers[i].setMap(null);
        }
        this.markers = [];
		if(this.businesses.length){
			var bounds = new google.maps.LatLngBounds();
			for (let business of this.businesses){
				var marker = new google.maps.Marker({
		          position: new google.maps.LatLng(business.latitude, business.longitude),
		          map: this.map,
		          icon:{
					    url: 'http://api.rezervnow.com/icon/marker.png',
					    // scaledSize: new google.maps.Size(50, 50),
					    // origin: new google.maps.Point(0,0),
					    // anchor: new google.maps.Point(0, 0)
					}
		        });
		        marker.addListener('click',()=>{
		        	//this.selectedBusiness = business;
					//this.pushBusinessDetail(business);
				});

				bounds.extend(marker.getPosition());
		        this.markers.push(marker);
			}
			this.map.fitBounds(bounds);
			this.map.setCenter(bounds.getCenter());
			this.map.setZoom(8);
		}
	}

    createRange(number){
		var items: number[] = [];
		for(var i = 1; i <= number; i++){
		 items.push(i);
		}
		return items;
	}
	pagination(c, m) {
	    var current = c,
	        last = m,
	        delta = 2,
	        left = current - delta,
	        right = current + delta + 1,
	        range = [],
	        rangeWithDots = [],
	        l;
	    for (let i = 1; i <= last; i++) {
	        if (i == 1 || i == last || i >= left && i < right) {
	            range.push(i);
	        }
	    }
	    for (let i of range) {
	        if (l) {
	            if (i - l === 2) {
	                rangeWithDots.push(l + 1);
	            } else if (i - l !== 1) {
	                rangeWithDots.push('...');
	            }
	        }
	        rangeWithDots.push(i);
	        l = i;
	    }
	    return rangeWithDots;
	}
}
