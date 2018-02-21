import {Injectable} from '@angular/core';
import {Http,Response,RequestOptions,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Employee} from '../model/employee.model'


@Injectable()

export class EmployeeService{

    private _employeeUrl = 'https://employee-directory-app-edureka.herokuapp.com/api/';

    constructor (private _http:Http)
    {

    }

    getRequest(requestType:string):Observable<any[]>{
        return this._http.get(this._employeeUrl+requestType)
        .map((response:Response)=><any[]>response.json())
        .catch(this.handleError);
    }

    private handleError(error:Response){
        return Observable.throw(error.json().error|| 'Server Error');
    }

    postRequest(employeeinfo:Employee, requestType:string):Observable<any>{
        
        let body = JSON.stringify(employeeinfo);        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.post(this._employeeUrl+requestType,body,options)
        .map((response:Response)=><any[]>response.json())
        .catch(this.handleError);    
    }    

    deleteRequest(apiUrl:string):Observable<any>{
        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.delete(this._employeeUrl+apiUrl,options)
        .map(res=>res.json)             
    }

    updateRequest(employeeinfo:Employee, apiUrl:string):Observable<any>{
        
        console.log("coming in service",employeeinfo);
        let body = JSON.stringify(employeeinfo);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this._http.put(this._employeeUrl+apiUrl,body,options)
        .map(res=>res.json); 
    }
    
}
