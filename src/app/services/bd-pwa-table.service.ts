import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root'
})
export class BdPwaTableService {
  private dbTable:any;

  constructor() {
    this.dbTable= new PouchDB('cacheTableBase');
  }

  saveLocalTableLabels(pendingLabels){
    this.dbTable.get(pendingLabels._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingLabels._id;
        doc = Object.assign(doc, pendingLabels);
        this.dbTable.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.dbTable.put(pendingLabels)
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

  saveLocalTableData(pendingTableData){
    this.dbTable.get(pendingTableData._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Object Found and updated');
        delete pendingTableData._id;
        doc = Object.assign(doc, pendingTableData);
        this.dbTable.put(doc);
      })
      .catch((err)=>{
        if(err){
          console.log(err);
        };
        this.dbTable.put(pendingTableData)
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

  getTableLocalData=()=>new Promise((resolve, reject)=>{
    this.dbTable.allDocs(
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

  clearTableLocalDB=(item)=>{
    var id=item._id;
    var rev=item._rev;
    this.dbTable.remove(id, rev, function(err){
      if(err){
        return console.log(err);
      }else{
        return console.log("Document deleted successfully");
      }
    });
  }
}
