import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/Global';

@Injectable({
  providedIn: 'root'
})
export class PiechartService {
  public url:string= Global.url;

  constructor(
    public _http : HttpClient
  ) { }

  savePieChartLabels(labels):Observable<any>{
    let params= JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'savePieChartLabels',params,{headers:headers});
  }

  savePieChartData(data):Observable<any>{
    let params= JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'savePieChartData',params,{headers:headers});
  }

  updatePieChartLabels(labels):Observable<any>{
    let params = JSON.stringify(labels);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'updatePieChartLabels',params,{headers:headers});
  }

  getPieChartLabels():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getPieChartLabels',{headers:headers});
  }

  getAllpiedata(dataId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getAllpiedata/'+dataId,{headers:headers});
  }

  deletePieData(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deletePieSeries/'+id,{headers:headers});
  }

}
