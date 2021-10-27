import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root'
})
export class DbPwaService {
  private db: any;

  constructor() {
    this.db = new PouchDB('cacheHighCartsBase');
  }

  saveLocalLabels(pendingLabels){
    this.db.get(pendingLabels._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingLabels._id;
        doc = Object.assign(doc, pendingLabels);
        this.db.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.db.put(pendingLabels)
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

  saveLocalData(pendingChartData){
    this.db.get(pendingChartData._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingChartData._id;
        doc = Object.assign(doc, pendingChartData);
        this.db.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.db.put(pendingChartData)
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

  getMainChartLocalData=()=>new Promise((resolve, reject)=>{
    this.db.allDocs(
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

  clearDbData=(item)=>{
    var id=item._id;
    var rev=item._rev;
    this.db.remove(id, rev, function(err){
      if(err){
        return console.log(err);
      }else{
        return console.log("Document deleted successfully");
      }
    });
  }
}
