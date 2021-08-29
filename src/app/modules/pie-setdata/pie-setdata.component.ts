import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { PieChartLabelsModel, PieChartDataModel } from '../../models/pieChartModel';

@Component({
  selector: 'app-pie-setdata',
  templateUrl: './pie-setdata.component.html',
  styleUrls: ['./pie-setdata.component.scss']
})
export class PieSetdataComponent implements OnInit {
  public pieChartLabels: PieChartLabelsModel;
  public pieChartData: PieChartDataModel;
  public idLabel:String;
  public savedWarn:String;
  public dataSeries:any;
  public totalPercentage:number;
  public deleteWarn:String;

  //pieChart=[];

  constructor(
    private _dashboardService: DashboardService
  ) {
  this.pieChartLabels= new PieChartLabelsModel('','','','');
  this.pieChartData= new PieChartDataModel('','','');
  }

  ngOnInit(): void {
    //this.pieChart= this._dashboardService.pieChart();
  }

  dataSeriesOutput(e){
    console.log(e);
    if(e){
      let showData=[];
      var counter=0;
      e.forEach(element => {
        let dataconversion=[];

        let myData=JSON.parse(element.percentage);
        counter+=myData;
        console.log(myData);
        showData.push({id:element.serieId,name:element.pieceName, data:myData});
        console.log(showData);
      });
      this.dataSeries=showData;
      this.totalPercentage=counter;
      console.log(this.dataSeries);

      console.log(this.totalPercentage);


    }
  }

  getIdLabel(e){
    console.log(e._id);
    this.idLabel=e._id;
    this.pieChartLabels=e;
    console.log(this.pieChartLabels);

  }


  onSubmitLabels(form){
    console.log(this.idLabel);//obtenida del get con output
    console.log(this.pieChartLabels);

    if(this.idLabel!=undefined){
      console.log('esta es la idLabel'+this.idLabel);
      this._dashboardService.updatePieChartLabels(this.pieChartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);
          // setTimeout(()=>{
          //   location.reload();
          // },3000);

      },err=>{
        console.log(<any>err);

      });

    }else{
      console.log('no hay idLAbel');
      this.pieChartLabels.idLabel=this.idLabel;
      this._dashboardService.savePieChartLabels(this.pieChartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);

          // setTimeout(()=>{
          //   location.reload();
          // },3000);

        },err=>{
          console.log(<any>err);

        });
    }
  }

  onSubmitData(form){
    this.pieChartData.chartlabelId=this.idLabel;
    console.log(this.pieChartData);

    this._dashboardService.savePieChartData(this.pieChartData).subscribe(
      response=>{
        console.log(response);
        this.savedWarn=response.message;
          //console.log(response);

          setTimeout(()=>{
            location.reload();
          },3000);

      },err=>{
        console.log(<any>err);

      });
  }

  deleteSeries(id){
    console.log(id);
    this._dashboardService.deletePieData(id).subscribe(
      res=>{
        console.log(res);
        this.deleteWarn=res.message;
        setTimeout(()=>{
          location.reload();
        },3000);
      },
      err=>{
        console.log(<any>err);
      }
    );

  }

}
