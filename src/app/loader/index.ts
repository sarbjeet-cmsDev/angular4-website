import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../providers/data';

@Component({
	selector: 'angular-loader',
	template: `<ng-container *ngIf="loader">
		<div id="loader-wrapper">
		    <div id="loader"></div>
		</div>
	</ng-container>`,
	styleUrls: ['./loader.css']
})
export class Loader {
	loader:boolean = false;
	constructor(private dataService: DataService) {
		this.dataService.loader.subscribe(loader => this.loader = loader);
    }
}
