import { Component } from '@angular/core';
import { MainChartLabelsModel, MainChartDataModel } from '../../models/mainChartModel';
import { MainchartService } from '../../services/mainchart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as numeral from 'numeral';


@Component({
  selector: 'app-setdata',
  templateUrl: './setdata.component.html',
  styleUrls: ['./setdata.component.scss']
})
export class SetdataComponent {
  public chartLabels: MainChartLabelsModel;
  public chartData: MainChartDataModel;
  public savedLabelsWarn:string;
  public savedDataWarn:string;
  public idLabel:string;
  public dataSeries:any;
  public deleteWarn:String;
  public formLabel: FormGroup;
  public formData: FormGroup;

  constructor(
    private _mainchartService: MainchartService,
    private _formBuilder: FormBuilder
  ) {
    this.chartLabels=new MainChartLabelsModel('','','','','','','');
    this.chartData=new MainChartDataModel('','','','');
    this.formLabelCreate();
    this.formDataCreate();
  }

  formLabelCreate(){
    this.formLabel = this._formBuilder.group({
      title: [this.chartLabels.title, [Validators.required]],
      subTitle: [this.chartLabels.subTitle, [Validators.required]],
      labelXAxis: [this.chartLabels.labelXAxis, [Validators.required]],
      labelYAxis: [this.chartLabels.labelYAxis, [Validators.required]],
      toolTip: [this.chartLabels.toolTip, [Validators.required]],
      categories: [this.chartLabels.categories, [Validators.required]]
    });
  }

  formDataCreate(){
    this.formData = this._formBuilder.group({
      seriesName: ['', [Validators.required]],
      data: ['', [Validators.required]],
      target: ['', [Validators.required]]
    });
  }

  deleteSeries(seriesId){
    this._mainchartService.deleteSeries(seriesId).subscribe(
      res=>{
        this.deleteWarn=res.message;
        setTimeout(()=>{
          location.reload();
        },1000);
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
        myData=myData.map((element)=>{
          return element = numeral(element).format('0,0');
        });
        var strFinal = myData.join('  --  ');
        showData.push(
          {
            id:element.serieId,
            name:element.name,
            data:strFinal,
            target:element.target
          }
        );
      });
      this.dataSeries=showData;
    }
  }

  getIdLabel(e){
    this.idLabel=e._id;
    this.chartLabels=e;
    this.formLabelCreate();
  }

  onSubmitLabel(){
    if(this.formLabel.valid){
      this.chartLabels={
        _id: this.idLabel,
        title: this.formLabel.value.title,
        subTitle: this.formLabel.value.subTitle,
        labelXAxis: this.formLabel.value.labelXAxis,
        labelYAxis: this.formLabel.value.labelYAxis,
        toolTip: this.formLabel.value.toolTip,
        categories: this.formLabel.value.categories
      }

      if(this.idLabel!=undefined){
        this._mainchartService.updateBigChartLabels(this.chartLabels).subscribe(
          response=>{
            this.savedLabelsWarn=response.message;
            setTimeout(()=>{
              location.reload();
            },1000);
          },
          err=>{
            console.log(<any>err);
          }
        );
      }else{
        this.chartLabels._id=this.idLabel;
        this._mainchartService.saveBigChartLabels(this.chartLabels).subscribe(
          response=>{
            this.savedLabelsWarn=response.message;
            setTimeout(()=>{
              location.reload();
            },1000);
          },err=>{
            console.log(<any>err);
          }
        );
      }
    }
  }

  onSubmitData(){
    if(this.formData.valid){
      this.chartData={
        chartlabelId: this.idLabel,
        seriesName: this.formData.value.seriesName,
        data: this.formData.value.data,
        target: this.formData.value.target
      }
      this._mainchartService.saveBigChartData(this.chartData).subscribe(
        response=>{
          this.savedDataWarn=response.message;
            setTimeout(()=>{
              location.reload();
            },1000);
        },err=>{
          console.log(<any>err);
        }
      );
    }
  }

  charFilter(e){
    return (e.charCode >= 48 && e.charCode <= 57 || e.charCode == [32] || e.charCode == 46);
  }
}
