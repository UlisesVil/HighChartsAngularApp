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
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getAlldata/'+dataId,{headers:headers});
  }

  deleteSeries(seriesId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deleteSeries/'+seriesId,{headers:headers});
  }


  getBigChartLabels():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getMainChartLabels',{headers:headers});
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
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getPieChartLabels',{headers:headers});
  }


  getAllpiedata(dataId):Observable<any>{
    console.log(dataId);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getAllpiedata/'+dataId,{headers:headers});
  }

  deletePieData(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deletePieSeries/'+id,{headers:headers});
  }




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
    console.log(labels);

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
