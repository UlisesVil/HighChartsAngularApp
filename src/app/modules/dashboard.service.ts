import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../shared/Global';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public url:string= Global.url;

  constructor(
    public _http : HttpClient
  ) { }

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

  getAlldata(dataId):Observable<any>{
    return this._http.get(this.url+'getAlldata/'+dataId);
  }

  deleteSeries(seriesId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deleteSeries/'+seriesId,{headers:headers});
  }


  getBigChartLabels():Observable<any>{
    return this._http.get(this.url+'getMainChartLabels');
  }


  getdataCards():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getdataCards',{headers:headers});

  }






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
    return this._http.get(this.url+'getPieChartLabels');
  }


  getAllpiedata(dataId):Observable<any>{
    console.log(dataId);

    return this._http.get(this.url+'getAllpiedata/'+dataId);
  }

  deletePieData(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deletePieSeries/'+id,{headers:headers});
  }


}
