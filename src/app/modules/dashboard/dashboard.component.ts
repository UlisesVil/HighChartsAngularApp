import { Component, OnInit } from '@angular/core';
import { MainchartService } from '../../services/mainchart.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards=[];

  constructor(
    private _mainchartService: MainchartService
  ) { }

  ngOnInit(): void {
    this.getCardsInfo();
  }

  getCardsInfo(){
    this._mainchartService.getdataCards().subscribe(
      res=>{
        let dataDB=[];
          res.data.forEach(element => {
            //Average
            let dataArr=JSON.parse(element.data);
            var dataSum=0;
            for(let i=0; i<=dataArr.length-1; i++){
              dataSum+=dataArr[i];
            }
            let average=(dataSum/dataArr.length);
            //Target Percentage
            let targetPercentage= parseInt(
              ((dataArr[dataArr.length-1]* 100)/element.target)
              .toFixed(2)
            );
            dataDB.push({
              name:element.name,
              data:JSON.parse(element.data),
              average:average,
              targetPercentage: targetPercentage,
              target: element.target
            })
          });
        this.cards=dataDB;
      },err=>{
        console.log(<any>err);
      }
    );
  }
}
