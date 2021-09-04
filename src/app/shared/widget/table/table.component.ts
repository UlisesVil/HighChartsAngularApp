import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../../../services/table.service';
import { TableDataInterface } from '../../../interfaces/tabledata-interface';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() dataLabelsId: EventEmitter<any>= new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['position', 'dataH1', 'dataH2', 'dataH3'];
  public ELEMENT_DATA: TableDataInterface[];
  public dataSource:any;
  public labelsData:any;
  public emptyWarn:String;
  public deletedWarn:String;

  constructor(
    public _tableService: TableService
  ) { }

  ngOnInit(): void {
    this.getTableInfo();
  }

  deleteSeries(id){
    this._tableService.deleteTableData(id).subscribe(
      res=>{
        this.deletedWarn=res.message;
        setTimeout(()=>{
          location.reload();
        },3000);
      },err=>{
        console.log(<any>err);
      }
    );
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
            },
            err=>{
              console.log(<any>err);
            }
          );
        }else{
          this.emptyWarn='Por favor Guarda los encabezados rimero para poder capturar valores en la tabla'
        }
      },
      err=>{
        console.log(<any>err);
      }
    );
  }
}
