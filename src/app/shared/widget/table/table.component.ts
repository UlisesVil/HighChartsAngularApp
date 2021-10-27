import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../../../services/table.service';
import { TableDataInterface } from '../../../interfaces/tabledata-interface';
import { BdPwaTableService } from '../../../services/bd-pwa-table.service';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() dataLabelsId: EventEmitter<any>= new EventEmitter();
  @Output() dataLocal: EventEmitter<any>= new EventEmitter();
  @Output() labelsLocal: EventEmitter<any>= new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['position', 'dataH1', 'dataH2', 'dataH3'];
  public ELEMENT_DATA: TableDataInterface[];
  public dataSource:any;
  public labelsData:any;
  public deletedWarn:String;
  public findLocation:number;
  public findLocationTrash:number;
  public localLabels:any;
  public localDataDB:any[]=[];

  constructor(
    public _tableService: TableService,
    private _bdPwaTableService: BdPwaTableService
  ) { }

  ngOnInit(): void {
    this.getTableInfo();
    this.getLocalData();
  }

  locationEmptyWarn(){
    let location=window.location.href;
    this.findLocation=location.search('table-setdata');
  }

  locationTrash(){
    let location=window.location.href;
    this.findLocationTrash=location.search('table-setdata');
  }

  getTableInfo(){
    this._tableService.getTableLabels().subscribe(
      res=>{
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
          let dataId=res.data[0]._id;
          this._tableService.getAllTabledata(dataId).subscribe(
            res=>{
              let data=[];
              let counter=0;
              res.data.forEach(element => {
                data.push(
                  {
                    position:counter+=1,
                    dataH1:element.dataH1,
                    dataH2:element.dataH2,
                    dataH3:element.dataH3,
                    dataId:element._id
                  }
                )
              });
              this.ELEMENT_DATA=data;
              this.dataSource = new MatTableDataSource<TableDataInterface>(this.ELEMENT_DATA);
              this.dataSource.paginator = this.paginator;
              this.locationTrash();
            },
            err=>{
              console.log(<any>err);
            }
          );
        }else{
          this.locationEmptyWarn();
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  getLocalData(){
    this._bdPwaTableService.getTableLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.header1){
            this.localLabels=doc;
            this.labelsLocal.emit(this.localLabels);
          }
          if(doc.dataH1){
            let element={
              dataH1:doc.dataH1,
              dataH2:doc.dataH2,
              dataH3:doc.dataH3,
              _id:doc._id,
              _rev:doc._rev
            }
            this.localDataDB.push(element);
            this.dataLocal.emit(this.localDataDB);
          }
        });
      })
    ;
  }

  deleteSeries(id){
    this._tableService.deleteTableData(id).subscribe(
      res=>{
        this.deletedWarn=res.message;
        setTimeout(()=>{
          location.reload();
        },1000);
      },
      err=>{
        console.log(<any>err);
      }
    );
  }
}
