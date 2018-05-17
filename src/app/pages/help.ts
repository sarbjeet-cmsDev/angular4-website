import { Component } from '@angular/core';

import { DataService } from '../providers/data';

@Component({
  selector: 'app-root',
  template: `
  		<header-section></header-section>
  		<main>
  			<div class="container">
	  			<div class="row">
	  				ABOUT US
	  			</div>
  			</div>
  		</main>
  		`,
})
export class HelpPage {
	constructor() {

    }
}
