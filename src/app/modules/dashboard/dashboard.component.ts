import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TimeoutError } from 'rxjs';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  //bigChart=[];
  cards=[];
  //pieChart=[];
  percentage='100%';

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
      this.getCardsInfo();

/*
    this.cards= this._dashboardService.cards();
    console.log(this.cards);
*/
    //this.pieChart= this._dashboardService.pieChart();

  }


  getCardsInfo(){

    this._dashboardService.getdataCards().subscribe(
      res=>{
        let dataDB=[];
          //console.log(res);

          res.data.forEach(async element => {
            //Average
            let dataArr=JSON.parse(element.data);
            //console.log(dataArr);
            var dataSum=0;
            for(let i=0; i<=dataArr.length-1; i++){
              dataSum+=dataArr[i];
              //console.log(dataArr[i]);

            }
            //console.log(dataSum);
            let average=(dataSum/dataArr.length)
            //console.log(average);

            //Target Percentage
            let targetPercentage= parseInt(((dataArr[dataArr.length-1]* 100)/element.target).toFixed(2));
            //console.log(targetPercentage);

            await dataDB.push({
              name:element.name,
              data:JSON.parse(element.data),
              average:average,
              targetPercentage: targetPercentage,
              target: element.target
            })
          });
        this.cards=dataDB;
        //console.log(dataDB);

      },err=>{
        console.log(<any>err);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}




