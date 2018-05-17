import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../providers/data';
declare var $:any;
@Component({
  selector: 'business-review',
  template: `
    <div class="col-md-12 mt-3" *ngIf="reviews.length">
        <h3>Customer Reviews ({{totalResult}})</h3>
        <div class='row review-row' *ngFor="let review of reviews;let i = index">
            <div class="col-md-2">
                <img src="{{ review.user.avatar_url }}">
            </div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-8">
                        <strong>{{ review.user.name }}</strong> 
                        <p [id]="'review'+i" [style.height]="review.review .length > 193 ? 75+'px' : 'auto'">
                            {{ review.review }}
                        </p>
                        <a (click)="readMoreReview('review'+i,$event)" *ngIf="review.review .length > 193" class="readmore">Read More</a>
                        <span class='date'>{{ review.created_at | date:'medium' }}</span>
                    </div>
                    <div class="col-md-4 text-right">
                        <mbsc-rating [(ngModel)]="review.rating" disabled="true" color="primary"></mbsc-rating>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <hr/>
            </div>
        </div>
    </div>
    <div class="col-md-12" *ngIf='reviews.length && pages.length > 1'>
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
      `,
})
export class BusinessReviews {
    totalResult:number = 0;
    currentPage:number = 1;
    lastPage:number = 1;
    pages:Array<any> = [];
    reviews:Array<any> = [];
    requestParams:any;
    constructor(private dataService: DataService,
        private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.route.params.subscribe(params => {
            this.requestParams = params;
            this.loadReviews(params);
        });
    }
    loadReviews(params,page=1){
        this.dataService.get("web/business/"+params.business+"/reviews?page="+page).subscribe(res => {
            this.reviews = res.data;
            this.pages = this.pagination(res.current_page,res.last_page);
            this.totalResult = res.total;
            this.lastPage = res.last_page;
            this.currentPage = res.current_page;
        });
    }
    loadPage(page){
        if(page != '...') this.loadReviews(this.requestParams,page);
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
    readMoreReview(p,ev){
        document.getElementById(p).style.height = "auto";
        ev.target.style.display = "none";
    }
}
