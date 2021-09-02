import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/Global';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public url:string= Global.url;

  constructor(
    public _http : HttpClient
  ) { }

  saveTableLabels(labels):Observable<any>{
    let params = JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'saveTableLabels', params, {headers:headers});
  }

  saveTableData(data):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'saveTableData',params,{headers:headers});
  }

  updateTableLabels(labels):Observable<any>{
    let params = JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'updateTableLabels',params,{headers:headers});
  }

  getTableLabels():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getTableLabels',{headers:headers});
  }

  getAllTabledata(labelId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getAllTabledata/'+labelId,{headers:headers});
  }

  deleteTableData(dataId):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deleteTableData/'+dataId,{headers:headers});
  }
}
