import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../providers/data';
declare var $:any;
@Component({
  selector: 'business-work',
  template: `
    
    <div class="row" *ngIf="work.length">
        <div class="col-md-12"><h3>Our Work</h3></div>
        <div class="col-md-12 mt-3 mb-2">
            <div id="business-reviews" class='work-gallery'>
                <div *ngFor="let post of work">
                    <a [href]="post.image_url" [attr.data-source]="post.image_url" [title]="post.caption"><img [alt]="post.caption" [attr.data-lazy]="post.image_url"  /></a>
                </div>
            </div>
        </div>
    </div>
      `,
})
export class BusinessWork {
    totalResult:number = 0;
    currentPage:number = 1;
    lastPage:number = 1;
    work:Array<any> = [];
    requestParams:any;
    constructor(private dataService: DataService,
        private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.route.params.subscribe(params => {
            this.requestParams = params;
            this.loadWork(params);
        });
    }
    loadWork(params,page=1){
        this.dataService.get("web/business/"+params.business+"/work?page="+page).subscribe(res => {
            this.work = res.data;
            this.totalResult = res.total;
            this.lastPage = res.last_page;
            this.currentPage = res.current_page;

            setTimeout(function(){
                $('#business-reviews').slick({
                    slidesToShow:4,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: false,
                    prevArrow: false,
                    nextArrow: false,
                    responsive: [
                        {breakpoint: 768,settings: {arrows: false,centerPadding: '40px',slidesToShow: 2}},
                        {breakpoint: 480,settings: {arrows: false,centerPadding: '40px',slidesToShow: 1}}
                    ]
                });

                $('.work-gallery').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    closeOnContentClick: false,
                    closeBtnInside: false,
                    mainClass: 'mfp-with-zoom mfp-img-mobile',
                    image: {
                        verticalFit: true,
                        titleSrc: function(item) {
                            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                        }
                    },
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300, // don't foget to change the duration also in CSS
                        opener: function(element) {
                            return element.find('img');
                        }
                    }

                });

            },5);
        });
    }
}
