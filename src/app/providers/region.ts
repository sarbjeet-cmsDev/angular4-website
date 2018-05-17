import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RegionService {
	public region: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor() {
		let region = localStorage.getItem('region');
		if (region != null && region.length)
		{
			this.region.next(JSON.parse(region));
		}else{
			this.region.next({code:'US',title:'United States'});
		}
		this.region.subscribe(region => localStorage.setItem('region',JSON.stringify(region)));
	}
}