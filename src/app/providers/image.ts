import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DataService } from './data';

@Injectable()
export class ImageService{
	public cats:Array<any> = [];
	constructor(private  http: Http,
        private  dataService: DataService) {

	}
	upload(data){
        this.dataService.loader.next(true);
		let headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post('https:\/\/api.rezervnow.com/web/user/profile/avatar', data, options)
        .map(res => {
            this.dataService.loader.next(false);
            return res.json();
        }).catch(err =>{
            this.dataService.loader.next(false);
            return err.json();
        });
	}
}