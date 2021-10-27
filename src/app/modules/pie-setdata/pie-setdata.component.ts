import { Component, OnInit } from '@angular/core';
import { PieChartLabelsModel, PieChartDataModel } from '../../models/pieChartModel';
import { PiechartService } from '../../services/piechart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BdPwaPieService } from '../../services/bd-pwa-pie.service';
import * as numeral from 'numeral';

@Component({
  selector: 'app-pie-setdata',
  templateUrl: './pie-setdata.component.html',
  styleUrls: ['./pie-setdata.component.scss']
})
export class PieSetdataComponent implements OnInit{
//Offline
  public localDBEmpty:boolean=false;
  public localLabels:any[]=[];
  public dataSeriesLocal:any;

//Online
  public pieChartLabels: PieChartLabelsModel;
  public pieChartData: PieChartDataModel;
  public idLabel:String;
  public savedLabelsWarn:String;
  public savedDataWarn:String;
  public dataSeries:any[];
  public totalPercentage:number;
  public totalPercentageNum:number;
  public deleteWarn:String;
  public formLabel: FormGroup;
  public formData: FormGroup;

  //Modal
  public okWarning:String[];
  public errorWarning:String;
  public modal: boolean=false;
  public sync:boolean=false;

  constructor(
    private _piechartService: PiechartService,
    private _formBuilder: FormBuilder,
    private _bdPwaPieService: BdPwaPieService
  ) {
    this.pieChartLabels= new PieChartLabelsModel('','','','');
    this.pieChartData= new PieChartDataModel('','','');
    this.formLabelCreate();
    this.formDataCreate();
  }

  ngOnInit():void {
    this.syncButtonControl();
  }

  locationReload(){
    setTimeout(()=>{
      location.reload();
    },1000);
  }

  syncButtonControl(){
    this._bdPwaPieService.getPieChartLocalData()
      .then((items:Array<any>)=>{
        if(items.length!==0 ){
          this.localDBEmpty=true;
        }else{
          this.localDBEmpty=false;
        }
      })
    ;
  }

  formLabelCreate(){
    this.formLabel = this._formBuilder.group({
      title: [this.pieChartLabels.title, [Validators.required]],
      valueSufix: [this.pieChartLabels.valueSufix, [Validators.required]],
      seriesName: [this.pieChartLabels.seriesName, [Validators.required]]
    });
  }

  formDataCreate(){
    this.formData = this._formBuilder.group({
      pieceName: ['', [Validators.required]],
      percentage: ['', [Validators.required]]
    });
  }

  dataSeriesOutput(e){
    if(e){
      let showData=[];
      var sum=0;
      e.forEach(element => {
        let myData=JSON.parse(element.percentage);
        sum+=myData;
        showData.push(
          {
            id:element.serieId,
            name:element.pieceName,
            data:numeral(myData).format('0,0'),
            dataNum:myData
          }
        );
      });
      this.dataSeries=showData;
      this.totalPercentage=numeral(sum).format('0,0');
      this.totalPercentageNum=sum;
    }
  }

  getIdLabel(e){
    this.idLabel=e._id;
    this.pieChartLabels=e;
    this.formLabelCreate();
  }

  onSubmitLabels(){
    if(this.formLabel.valid){
      this.pieChartLabels={
        _id: this.idLabel,
        title: this.formLabel.value.title,
        valueSufix: this.formLabel.value.valueSufix,
        seriesName: this.formLabel.value.seriesName
      }
      if(this.idLabel!=undefined){
        this._piechartService.updatePieChartLabels(this.pieChartLabels).subscribe(
          response=>{
            this.savedLabelsWarn=response.message;
            this.locationReload();
          },
          error=>{
            if(<any>error){
              console.log(<any>error);
            };
            this.okWarning=[
              "You Don't have Internet Connection.",
              "All changes will be saved in cache.",
              "The changes will be applied when Internet comes back and you activate the sync button."
            ];
            this.modal=true;
            this._bdPwaPieService.saveLocalPieLabels(this.pieChartLabels);
          }
        );
      }else{
        this.pieChartLabels._id=this.idLabel;
        this._piechartService.savePieChartLabels(this.pieChartLabels).subscribe(
          response=>{
            this.savedLabelsWarn=response.message;
            this.locationReload();
          },
          error=>{
            if(<any>error){
              console.log(<any>error);
            };
            this.okWarning=[
              "You Don't have Internet Connection.",
              "All changes will be saved in cache.",
              "The changes will be applied when Internet comes back and you activate the sync button."
            ];
            this.modal=true;
          }
        );
      }
    }
  }

  onSubmitData(){
    if(this.formData.valid){
      this.pieChartData={
        chartlabelId: this.idLabel,
        pieceName: this.formData.value.pieceName,
        percentage: this.formData.value.percentage
      }
      this.pieChartData.chartlabelId=this.idLabel;
      this._piechartService.savePieChartData(this.pieChartData).subscribe(
        response=>{
          this.savedDataWarn=response.message;
          this.locationReload();
        },
        error=>{
          if(<any>error){
            console.log(<any>error);
          };
          this.okWarning=[
            "You Don't have Internet Connection.",
            "All changes will be saved in cache.",
            "The changes will be applied when Internet comes back and you activate the sync button."
          ];
          this.modal=true;
          const chartPieDataLocal= {...this.pieChartData,_id:this.pieChartData.pieceName}
          this._bdPwaPieService.saveLocalPieData(chartPieDataLocal);
        }
      );
    }
  }

  deleteSeries(id){
    this._piechartService.deletePieData(id).subscribe(
      res=>{
        this.deleteWarn=res.message;
        this.locationReload();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  syncLocal(){
    this._bdPwaPieService.getPieChartLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.title){
            this.pieChartLabels=doc;
            if(this.pieChartLabels._id!=undefined){
              this._piechartService.updatePieChartLabels(this.pieChartLabels).subscribe(
                response=>{
                  this.savedLabelsWarn=response.message;
                  this._bdPwaPieService.clearPieLocalDB(doc);
                  this.locationReload();
                },
                error=>{
                  if(<any>error){
                    console.log(<any>error);
                  };
                  this.okWarning=[
                    "You Don't have Internet Connection.",
                    "All changes will be saved in cache.",
                    "The changes will be applied when Internet comes back and you activate the sync button."
                  ];
                  this.sync=true;
                  this.modal=true;
                }
              );
            }else{
              this.pieChartLabels._id=this.idLabel;
              this._piechartService.savePieChartLabels(this.pieChartLabels).subscribe(
                response=>{
                  this.savedLabelsWarn=response.message;
                  this.locationReload();
                },
                error=>{
                  if(<any>error){
                    console.log(<any>error);
                  };
                  this.okWarning=[
                    "You Don't have Internet Connection.",
                    "All changes will be saved in cache.",
                    "The changes will be applied when Internet comes back and you activate the sync button."
                  ];
                  this.modal=true;
                }
              );
            }
          }
          if(doc.pieceName){
            this.pieChartData=doc;
            this._piechartService.savePieChartData(this.pieChartData).subscribe(
              response=>{
                this.savedDataWarn=response.message;
                this._bdPwaPieService.clearPieLocalDB(doc);
                this.locationReload();
              },
              error=>{
                if(<any>error){
                  console.log(<any>error);
                };
                this.okWarning=[
                  "You Don't have Internet Connection.",
                  "All changes will be saved in cache.",
                  "The changes will be applied when Internet comes back and you activate the sync button."
                ];
                this.modal=true;
              }
            );
          }
        });
      })
    ;
  }

  getLocalLabels(e){
    this.localLabels.push(e);
  }

  dataSeriesLocalOutput(e){
    if(e){
      let showData=[];
      var sum=0;
      e.forEach(element => {
        let myData=JSON.parse(element.percentage);
        sum+=myData;
        showData.push(
          {
            _id:element.serieId,
            _rev:element._rev,
            name:element.pieceName,
            data:numeral(myData).format('0,0')
          }
        );
      });
      this.dataSeriesLocal=showData;
    }
  }

  deleteSeriesLocal(doc){
    this._bdPwaPieService.clearPieLocalDB(doc);
    this.locationReload();
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
    this.okWarning=e.okWarning;
    e.sync? this.sync=false : this.locationReload();
  }
}
