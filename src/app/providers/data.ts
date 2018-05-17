import { Http, Response, RequestOptionsArgs, RequestMethod, Headers, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private baseUrl:string = "https:\/\/api.rezervnow.com/";
    public headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    constructor(private  http: Http) {

        // check device is online 
        console.log('Data Service Initialize');
    }
    public get(url: string, options ? : {}): Observable < any > {

        let params = new URLSearchParams();
        if(options){
            for(let key in options){
                params.set(key, options[key]) 
            }
            url = url+'?'+params;
        }

        return this.request(RequestMethod.Get, url, null, options);
    }
    public post(url: string, body: any, options ? : RequestOptionsArgs): Observable < any > {
        return this.request(RequestMethod.Post, url, body, options);
    }
    public put(url: string, body: any, options ? : RequestOptionsArgs): Observable < any > {
        return this.request(RequestMethod.Put, url, body, options);
    }
    public delete(url: string, options ? : RequestOptionsArgs): Observable < any > {
        return this.request(RequestMethod.Delete, url, null, options);
    }
    public patch(url: string, body: any, options ? : RequestOptionsArgs): Observable < any > {
        return this.request(RequestMethod.Patch, url, body, options);
    }
    public head(url: string, options ? : RequestOptionsArgs): Observable < any > {
        return this.request(RequestMethod.Head, url, null, options);
    }
    private request(method: RequestMethod, url: string, body ? : any, options ? : RequestOptionsArgs) {

        
        let requestOptions = Object.assign({
            method: method,
            url: this.generateUrl(url),
            body: JSON.stringify(body)
        }, this.generateOptions(options));

        // Add General headers
        if (!requestOptions.headers) {
            requestOptions.headers = new Headers();
        }

        if (localStorage.getItem('token')) {
            // add Authorization header
            requestOptions.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        }
        this.loader.next(true);
        return this.http.request(new Request(requestOptions))
            .map(this.responseHandler, this)
            .catch(this.handleError.bind(this));
    }


    protected generateUrl(url: string): string {
        return this.baseUrl + url;
    }
    protected responseHandler(resp: Response): Response {
        this.loader.next(false);
        if (!!resp.text()) {
            return resp.json();
        }

        return resp;        
    }
    

    private handleError(error: Response | any) {
        this.loader.next(false);
        return Observable.throw(error.json());
    }
    protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        if (!options.headers) {
            options.headers = new Headers();
        }
        Object.keys(this.headers)
            .filter((key) => this.headers.hasOwnProperty(key))
            .forEach((key) => {
                options.headers.append(key, this.headers[key]);
            });

        return options;
    }
}
