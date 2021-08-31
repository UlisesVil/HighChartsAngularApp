import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from 'src/app/modules/dashboard.service';

export interface PeriodicElement {
  dataH1: string;
  position: number;
  dataH2: string;
  dataH3: string;
}

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Output() dataLabelsId: EventEmitter<any>= new EventEmitter();
  @Output() dataSeries: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['position', 'dataH1', 'dataH2', 'dataH3'];
  ELEMENT_DATA: PeriodicElement[];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  labelsData:any;
  //data:any[];

  public emptyWarn:string;

  constructor(
    public _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getTableInfo();

  }

  ngAfterViewInit() {
    //if(this.dataSource!=undefined){

    //}
  }

  deleteSeries(id){
    console.log(id);
    this._dashboardService.deleteTableData(id).subscribe(
      res=>{
        console.log(res);

      },err=>{
        console.log(<any>err);

      }
    );

  }

  getTableInfo(){
    this._dashboardService.getTableLabels().subscribe(
      res=>{
        console.log(res.data);
        console.log(res);
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
          let dataId=res.data[0]._id;
          console.log(this.labelsData);

          this._dashboardService.getAllTabledata(dataId).subscribe(
            res=>{
              console.log(res);
              let data=[];
              let counter=0;
              res.data.forEach(async element => {
                await data.push({
                  position:counter+=1,
                  dataH1:element.dataH1,
                  dataH2:element.dataH2,
                  dataH3:element.dataH3,
                  dataId:element._id
                })
              });
              console.log(data);
              //this.data=data;



              this.ELEMENT_DATA=data;
              //console.log(this.data);

              this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

              this.dataSource.paginator = this.paginator;



              //console.log(JSON.stringify(data[0].data));
              let dataDB=[];

              res.data.forEach(async element => {
                await dataDB.push({
                tableLabelId:element.tableLabelId,
                dataH1:element.dataH1,
                dataH2:element.dataH2,
                dataH3:element.dataH3
                })
              });
              this.dataSeries.emit(dataDB);
              console.log(dataDB);
            },err=>{
              console.log(<any>err);
            }
          );
        }else{
          this.emptyWarn='Por favor Guarda los encabezados rimero para poder capturar valores en la tabla'
        }
      },err=>{
        console.log(<any>err);
        console.log('no hay nada aun');

      }
    );


  }


}
/*
[
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
      {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
      {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
      {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
      {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
      {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
      {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
      {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
      {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
      {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    ]
*/


/*
this.ELEMENT_DATA=[
      {position: 1, dataH1: 'Hydrogen', dataH2: '1.0079', dataH3: 'H'},
      {position: 2, dataH1: 'Helium', dataH2: '4.0026', dataH3: 'He'},
      {position: 3, dataH1: 'Lithium', dataH2: '6.941', dataH3: 'Li'},
      {position: 4, dataH1: 'Beryllium', dataH2: '9.0122', dataH3: 'Be'},
      {position: 5, dataH1: 'Boron', dataH2: '10.811', dataH3: 'B'},
      {position: 6, dataH1: 'Carbon', dataH2: '12.0107', dataH3: 'C'},
      {position: 7, dataH1: 'Nitrogen', dataH2: '14.0067', dataH3: 'N'}
    ];
    console.log(this.data);

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
*/
