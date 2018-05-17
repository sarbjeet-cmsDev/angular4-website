import { Component } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'booking-calender',
  template: `
		<div class="row">
			<div class="col-md-1">
				<button (click)="prevWeek()">P</button>
			</div>
			<div class="col-md-10">
				<div class="row">
					<div class="col-md-12 text-center">
						<h4>{{ today | date:'MMMM, y' }}</h4>
					</div>
				</div>
				<div class="row">
					<div class="calendar">
						<ng-container *ngFor="let week of calendar">
							<div class="week">
								<ng-container *ngFor="let wd of week.days">
									<div class="day" >
										<strong (click)="dayClick(wd)" [class.active]="wd == selDate" >{{ wd | date:'d' }}</strong>
									</div>
								</ng-container>
							</div>
						</ng-container>
					</div>
				</div>
			</div>
			<div class="col-md-1  text-right">
				<button (click)="nextWeek()">N</button>
			</div>
		</div>
  			`,
})
export class BookingCalender {

	today:any = moment().format("YYYY-MM-DD");
	selDate:any = moment().format("YYYY-MM-DD");
	calendar:Array<any> = [];
	constructor() {
		this.calendar = this.getCalendar(this.today);
    }
    nextWeek(){

    	this.today = moment(this.today).add(1, 'week').format('YYYY-MM-DD');

    	this.calendar = this.getCalendar(this.today);
    	
    }
    prevWeek(){
    	this.calendar = this.getCalendar(this.today);
    	this.today = moment(this.today).subtract(1, 'week').format('YYYY-MM-DD');
    	this.selDate = moment(this.selDate).subtract(1, 'week').format('YYYY-MM-DD');
    }
    dayClick(day){
    	this.selDate = day;
    }
    getCalendar(day){
    	const startWeek = moment(day).startOf('month').week();
		const endWeek = moment(day).endOf('month').week();
		let calendar = []
		for(var week = startWeek; week <= endWeek;week++){
		  calendar.push({
	    	week:week,
	    	days:Array(7).fill(0).map((n, i) => 
	    		moment().week(week).startOf('week').clone().add(n + i, 'day').format('YYYY-MM-DD')
	    	)
		  })
		}
		return calendar;
    }
}
