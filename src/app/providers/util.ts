import { Injectable } from '@angular/core';
import { DataService } from './data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UtilService{
	public cats:Array<any> = [];
	constructor(private dataService: DataService) {

	}
	getCats(){
		if(this.cats && this.cats.length){
			return Observable.of(this.cats);
		}
		return this.dataService.get('web/categories').map((cats) => {
			this.cats = cats;
			return cats;
	    });
	}
	public static pagination(c, m) {
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