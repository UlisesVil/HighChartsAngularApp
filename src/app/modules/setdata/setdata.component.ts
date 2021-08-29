import { Component, OnInit } from '@angular/core';
import { MainChartLabelsModel, MainChartDataModel } from '../../models/mainChartModel';
import { NgForm } from '@angular/forms';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-setdata',
  templateUrl: './setdata.component.html',
  styleUrls: ['./setdata.component.scss']
})
export class SetdataComponent implements OnInit {
  public chartLabels: MainChartLabelsModel;
  public chartData: MainChartDataModel;
  public savedWarn:string;
  public idLabel:string;
  public dataSeries:any;
  public deleteWarn:String;



  constructor(
    private _dashboardService: DashboardService
  ) {
    this.chartLabels=new MainChartLabelsModel('','','','','','');
    this.chartData=new MainChartDataModel('','','','');
  }

  ngOnInit(): void {
    //this.getMainChartLabels();
  }

  deleteSeries(seriesId){
    console.log(seriesId);
    this._dashboardService.deleteSeries(seriesId).subscribe(
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

  dataSeriesOutput(e){
    console.log(e);
    if(e){
      //this.dataSeries=e;
      let showData=[];
      e.forEach(element => {
        let dataconversion=[];
        let myData=JSON.parse(element.data);
        let newStr=myData.toString()
        let strFinal=newStr.replace(/,/g,' - ');
        console.log(strFinal);
        showData.push({id:element.serieId,name:element.name, data:strFinal});
        console.log(showData);
      });
      this.dataSeries=showData;

    }
  }

  getIdLabel(e){
    console.log(e._id);
    this.idLabel=e._id;
    this.chartLabels=e;
    console.log(this.chartLabels);

  }

  onSubmitLabel(formLabelsMainChart){
    console.log(this.idLabel);
    console.log(this.chartLabels);

    if(this.idLabel!=undefined){
      console.log('esta es la idLabel'+this.idLabel);
      this._dashboardService.updateBigChartLabels(this.chartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);
          setTimeout(()=>{
            location.reload();
          },3000);

      },err=>{
        console.log(<any>err);

      });

    }else{
      console.log('no hay idLAbel');
      this.chartLabels.idLabel=this.idLabel;
      this._dashboardService.saveBigChartLabels(this.chartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);

          setTimeout(()=>{
            location.reload();
          },3000);

        },err=>{
          console.log(<any>err);

        });
    }
    //console.log(this.chartLabels);
    /*

*/
  }

  onSubmitData(formDataMainChart){
    this.chartData.chartlabelId=this.idLabel;
    console.log(this.chartData);

    this._dashboardService.saveBigChartData(this.chartData).subscribe(
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

















/*
  getMainChartLabels(){
    this._dashboardService.getBigChartLabels().subscribe(
      response=>{
        console.log(response.data[0]);
        if(response.data[0]!=undefined){
          let labelsData=response.data[0];
          console.log(labelsData);

        }
      },err=>{
        console.log(<any>err);
      });
  }*/
}
