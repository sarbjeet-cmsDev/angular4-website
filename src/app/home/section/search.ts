import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data';
import { UtilService } from '../../providers/util';
import { RegionService } from '../../providers/region';
import { Http } from '@angular/http';
declare var google: any;

@Component({
  selector: 'home-page-section-search',
  template: `
			<div class="container">
				<div class="row align-items-center banner">
					<div class="col">
						<h2>Find & Book</h2>
						<h2>Health and Beauty Services</h2>
						<form #searchForm="ngForm" (ngSubmit)='search(searchForm)'>
							<div class="row mb-3">
								<div class="col-md-3 pr-0">
									<input type="text" name='keywords' #keywords="ngModel" ngModel class="form-control" placeholder="Services">
								</div>
								<div class="col-md-3 p-0">
									<input type="text" name='location' [(ngModel)]="auto_complete"  id="autocomplete" (keyup)="clearPlace($event)" class="form-control" placeholder="Your City">
								</div>
								<div class="col-md-2 p-0">
									<button type='submit' class="btn btn-primary btn-block">
										Search
									</button>
								</div>
							</div>
						</form>
						<div class="row align-items-center">
							<div class="col">
								<label>Popular Search</label>
                                <ng-container *ngFor="let category of categories">
                                    <button (click)='go(category)' type="button" class="btn btn-light btn-sm">{{ category.title }}</button>
                                </ng-container>
							</div>
						</div>
					</div>
				</div>
			</div>`,
})
export class HomePageSearchSection {
    categories:Array<any> = [];
	auto_complete:string = null;
    place:any = null;
    region:any = null;
	autocomplete:any;
	googleValue:boolean = false;

	constructor(private router: Router,
        protected http: Http,
        private regionService: RegionService,
		private utilService: UtilService,
		private dataService: DataService) {

        regionService.region.subscribe(region => {
            this.region = region;
            this.auto_complete = null;
            if(this.autocomplete)
            this.autocomplete.setComponentRestrictions({'country': [this.region.code.toLowerCase()]});
        });

        this.utilService.getCats().subscribe(categories => {
            this.categories = categories;
        });
    }
    ngAfterViewInit(){
    	this.autocomplete = new google.maps.places.Autocomplete(
    		(document.getElementById('autocomplete')),
            {types: ['geocode']});
    	this.autocomplete.setComponentRestrictions({'country': [this.region.code.toLowerCase()]});
    	this.autocomplete.addListener('place_changed', ()=>{
    		let place = this.autocomplete.getPlace();
    		this.place = place;
    		this.auto_complete = place.formatted_address;
    		this.googleValue = true;
    		console.log(place);
    	});
    }
    clearPlace(ev){
    	if(this.googleValue){
    		this.auto_complete = String.fromCharCode(ev.which);
    		this.googleValue = false;
    	}
    }
    go(cat){
        this.router.navigate(['/search/category/'+cat.url_key]);
    }
    search(form){
    	let location = '',zipcode = '',region = '';
    	if(this.place){
    		let t = this.place.address_components.find(x => x.types.indexOf("locality") > -1);
    		if(t) location = t.long_name;
    		t = this.place.address_components.find(x => x.types.indexOf("postal_code") > -1);
    		if(t) zipcode = t.long_name;
    		t = this.place.address_components.find(x => x.types.indexOf("administrative_area_level_1") > -1);
    		if(t) region = t.long_name;
    	}
    	this.router.navigate(['/search'],{
    		queryParams: {
    			keywords: form.value.keywords,
    			location: location,
    			region: region,
    			zipcode: zipcode
    		} 
    	});
    }
}
