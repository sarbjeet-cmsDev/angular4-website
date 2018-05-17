import { Component } from '@angular/core';
import { UtilService } from '../../providers/util';
@Component({
  selector: 'home-page-section-category',
  template: `
  			<div class="container pt-5 pb-5">
				<div class="row text-center">
					<div class="col">
						<h2>Browse & Discover</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.</p>
					</div>
				</div>
			</div>
			<div class="container pb-5">
				<div class="row home-category">
					<div class="col-md-4 mb-5 text-center" *ngFor="let category of categories" >
						<div class='col cat-inner' [ngStyle]="{'background-image':'url('+category.avatar_url+')'}">
							<div class='inner'>
								<h2>{{ category.title }}</h2>
								<button [routerLink]="'/search/category/'+category.url_key" class="btn btn-outline-primary">
									View
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>`,
})
export class HomePageCategorySection {
	categories:Array<any> = [];
	country:any = {};
	constructor(private utilService: UtilService) {
		//this.country = window.location.pathname.replace(/^\/|\/$/g, '').split("/")[0];
		this.utilService.getCats().subscribe(categories => {
            this.categories = categories;
        });
    }
}
