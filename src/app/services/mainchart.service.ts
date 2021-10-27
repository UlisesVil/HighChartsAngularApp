import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/Global';

@Injectable({
  providedIn: 'root'
})
export class MainchartService {
  public url:string= Global.url;

  constructor(
    public _http : HttpClient
  ) { }

  getAlldata(dataId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getAlldata/'+dataId,{headers:headers});
  }

  getBigChartLabels():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getMainChartLabels',{headers:headers});
  }

  getdataCards():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getdataCards',{headers:headers});
  }

  saveBigChartLabels(labels):Observable<any>{
    let params= JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'saveMainChartLabels',params,{headers:headers});
  }

  saveBigChartData(data):Observable<any>{
    let params= JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'saveMainChartData',params,{headers:headers});
  }

  updateBigChartLabels(labels):Observable<any>{
    let params = JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'updateMainChartLabels',params,{headers:headers});
  }

  deleteSeries(seriesId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deleteSeries/'+seriesId,{headers:headers});
  }

}
