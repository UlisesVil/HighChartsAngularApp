import { Component } from '@angular/core';
import { PieChartLabelsModel, PieChartDataModel } from '../../models/pieChartModel';
import { PiechartService } from '../../services/piechart.service';

@Component({
  selector: 'app-pie-setdata',
  templateUrl: './pie-setdata.component.html',
  styleUrls: ['./pie-setdata.component.scss']
})
export class PieSetdataComponent {
  public pieChartLabels: PieChartLabelsModel;
  public pieChartData: PieChartDataModel;
  public idLabel:String;
  public savedWarn:String;
  public dataSeries:any[];
  public totalPercentage:number;
  public deleteWarn:String;

  constructor(
    private _piechartService: PiechartService
  ) {
  this.pieChartLabels= new PieChartLabelsModel('','','','');
  this.pieChartData= new PieChartDataModel('','','');
  }

  dataSeriesOutput(e){
    if(e){
      let showData=[];
      var counter=0;
      e.forEach(element => {
        let myData=JSON.parse(element.percentage);
        counter+=myData;
        showData.push(
          {
            id:element.serieId,
            name:element.pieceName,
            data:myData
          }
        );
      });
      this.dataSeries=showData;
      this.totalPercentage=counter;
    }
  }

  getIdLabel(e){
    this.idLabel=e._id;
    this.pieChartLabels=e;
  }

  onSubmitLabels(form){
    if(this.idLabel!=undefined){
      this._piechartService.updatePieChartLabels(this.pieChartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },3000);
        },
        err=>{
        console.log(<any>err);
      });
    }else{
      this.pieChartLabels.idLabel=this.idLabel;
      this._piechartService.savePieChartLabels(this.pieChartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
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

  onSubmitData(form){
    this.pieChartData.chartlabelId=this.idLabel;
    this._piechartService.savePieChartData(this.pieChartData).subscribe(
      response=>{
        this.savedWarn=response.message;
        setTimeout(()=>{
          location.reload();
        },3000);
      },
      err=>{
        console.log(<any>err);
      }
    );
  }

  deleteSeries(id){
    this._piechartService.deletePieData(id).subscribe(
      res=>{
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
