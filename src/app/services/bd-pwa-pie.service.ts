import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root'
})
export class BdPwaPieService {
  private dbPie:any;

  constructor() {
    this.dbPie= new PouchDB('cachePieChartBase');
  }

  saveLocalPieLabels(pendingLabels){
    this.dbPie.get(pendingLabels._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingLabels._id;
        doc = Object.assign(doc, pendingLabels);
        this.dbPie.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.dbPie.put(pendingLabels)
          .then(function () {
            return console.log('[LOCAL]: New local registry was created');
          })
          .catch(function (err) {
            return console.log(err);
          })
        ;
      })
    ;
  }

  saveLocalPieData(pendingChartData){
    this.dbPie.get(pendingChartData._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingChartData._id;
        doc = Object.assign(doc, pendingChartData);
        this.dbPie.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.dbPie.put(pendingChartData)
          .then(function () {
            return console.log('[LOCAL]: New local registry was created');
          })
          .catch(function (err) {
            return console.log(err);
          })
        ;
      })
    ;
  }

  getPieChartLocalData=()=>new Promise((resolve, reject)=>{
    this.dbPie.allDocs(
      {
        include_docs:true
      }
    )
    .then(({rows})=>{
      resolve(rows);
    })
    .catch(()=>{
      reject(null);
    });
  });

  clearPieLocalDB=(item)=>{
    var id=item._id;
    var rev=item._rev;
    this.dbPie.remove(id, rev, function(err){
      if(err){
        return console.log(err);
      }else{
        return console.log("Document deleted successfully");
      }
    });
  }
}
