import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent{
    titles:Array<any> = [
        {url:'/about',title:'About Us | RezervNow Inc.'},
        {url:'/contact',title:'Contact Us | RezervNow Inc.'},
        {url:'/privacy_policy',title:'Privacy Policy | RezervNow Inc.'},
        {url:'/support',title:'Faqs | RezervNow Inc.'},
        {url:'/login',title:'Login | RezervNow Inc.'},
        {url:'/signup',title:'Signup | RezervNow Inc.'},
        {url:'/forgetpassword',title:'Forget Password | RezervNow Inc.'},
    ]

	constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            let title = this.titles.find(x => x.url == this.router.url);
            if(title) this.titleService.setTitle(title.title);
            else this.titleService.setTitle('RezervNow Inc.');
            window.scrollTo(0, 0)
        });
    }
}
