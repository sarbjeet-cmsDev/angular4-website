import { Component } from '@angular/core';

import { DataService } from '../providers/data';

@Component({
  selector: 'page-business',
  template: `
  		<header-section></header-section>
  		<main>
  			<div class="container">
                <div class="row">
    	  			<div class="col text-justify">
                        <h1>Business Account</h1>
                        <p>
                            RezervNow for Customers is a FREE booking system for people looking to schedule appointments for health & beauty services. Customers can download the app (available for Android & iOS) or visit marketplace www.rezervnow.com to find local services. Whether it’s finding new health & beauty services or booking with your favorite one, scheduling appointments just got easier!
    	  				</p>
                    </div>
	  			</div>
  			</div>
  		</main>
  		`,
})
export class BusinessPage {
	constructor() {

    }
}
