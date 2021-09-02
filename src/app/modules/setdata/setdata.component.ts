import { Component } from '@angular/core';
import { MainChartLabelsModel, MainChartDataModel } from '../../models/mainChartModel';
import { MainchartService } from '../../services/mainchart.service';

@Component({
  selector: 'app-setdata',
  templateUrl: './setdata.component.html',
  styleUrls: ['./setdata.component.scss']
})
export class SetdataComponent {
  public chartLabels: MainChartLabelsModel;
  public chartData: MainChartDataModel;
  public savedWarn:string;
  public idLabel:string;
  public dataSeries:any;
  public deleteWarn:String;

  constructor(
    private _mainchartService: MainchartService
  ) {
    this.chartLabels=new MainChartLabelsModel('','','','','','');
    this.chartData=new MainChartDataModel('','','','');
  }

  deleteSeries(seriesId){
    this._mainchartService.deleteSeries(seriesId).subscribe(
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

  dataSeriesOutput(e){
    if(e){
      let showData=[];
      e.forEach(element => {
        let myData=JSON.parse(element.data);
        let newStr=myData.toString()
        let strFinal=newStr.replace(/,/g,' - ');
        showData.push(
          {
            id:element.serieId,
            name:element.name,
            data:strFinal
          }
        );
      });
      this.dataSeries=showData;
    }
  }

  getIdLabel(e){
    this.idLabel=e._id;
    this.chartLabels=e;
  }

  onSubmitLabel(formLabelsMainChart){
    if(this.idLabel!=undefined){
      this._mainchartService.updateBigChartLabels(this.chartLabels).subscribe(
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
    }else{
      this.chartLabels.idLabel=this.idLabel;
      this._mainchartService.saveBigChartLabels(this.chartLabels).subscribe(
        response=>{
          this.savedWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },3000);
        },err=>{
          console.log(<any>err);
        }
      );
    }
  }

  onSubmitData(formDataMainChart){
    this.chartData.chartlabelId=this.idLabel;
    this._mainchartService.saveBigChartData(this.chartData).subscribe(
      response=>{
        this.savedWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },3000);
      },err=>{
        console.log(<any>err);
      }
    );
  }
}
