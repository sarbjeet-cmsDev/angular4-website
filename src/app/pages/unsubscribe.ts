import { Component } from '@angular/core';
import { DataService } from '../providers/data';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
  		<header-section></header-section>
  		<main>
  			<div class="container">
	  			<div class="row" *ngIf="unsubscribe">
                    <div class="col-md-12 mt-5 ">
                        <h2>Thank You</h2>
                        <p>You have been successfully removed from subscriber list. You will no longer hear from us.</p>
                    </div>
                </div>
                <div class="row" *ngIf="!unsubscribe && !loading">
                    <div class="col-md-12 mt-5 ">
                        <h2>Something Wrong, Try Again!</h2>
	  			    </div>
	  			</div>
  			</div>
  		</main>
  		`,
})
export class UnsubscribePage {
    unsubscribe:boolean = false;
    loading:boolean = true;
	constructor(private dataService : DataService,
        private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.route.params.subscribe(params => {
           this.dataService.post('unsubscribe',params).subscribe(res => {
                this.unsubscribe = true;
                this.loading = false;
           },err =>{
                this.loading = false;
           });
        });
    }
}
