import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



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



}




