import { Component, OnInit} from '@angular/core';
import { MainChartLabelsModel, MainChartDataModel } from '../../models/mainChartModel';
import { MainchartService } from '../../services/mainchart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbPwaService } from '../../services/db-pwa.service';
import * as numeral from 'numeral';

@Component({
  selector: 'app-setdata',
  templateUrl: './setdata.component.html',
  styleUrls: ['./setdata.component.scss']
})
export class SetdataComponent implements OnInit{
  //Offline
  public localDBEmpty:boolean=false;
  public dataSeriesLocal:any;
  public localLabels:any[]=[];

  //Online
  public chartLabels: MainChartLabelsModel;
  public chartData: MainChartDataModel;
  public savedLabelsWarn:string;
  public savedDataWarn:string;
  public idLabel:string;
  public dataSeries:any;
  public deleteWarn:String;
  public formLabel: FormGroup;
  public formData: FormGroup;


  //Modal
  public okWarning:String[];
  public errorWarning:String;
  public modal: boolean=false;
  public sync:boolean=false;

  constructor(
    private _mainchartService: MainchartService,
    private _formBuilder: FormBuilder,
    private _dbPwaService: DbPwaService
  ) {
    this.chartLabels=new MainChartLabelsModel('','','','','','','');
    this.chartData=new MainChartDataModel('','','','');
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
        this.locationReload();
      },
      error=>{
        console.log(<any>error);
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
            this._dbPwaService.saveLocalLabels(this.chartLabels);
          }
        );
      }else{
        this.chartLabels._id=this.idLabel;
        this._mainchartService.saveBigChartLabels(this.chartLabels).subscribe(
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
      this.chartData={
        chartlabelId: this.idLabel,
        seriesName: this.formData.value.seriesName,
        data: this.formData.value.data,
        target: this.formData.value.target
      }
      this._mainchartService.saveBigChartData(this.chartData).subscribe(
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
          const chartDataLocal= {...this.chartData,_id:this.chartData.seriesName}
          this._dbPwaService.saveLocalData(chartDataLocal);
        }
      );
    }
  }

  charFilter(e){
    return (e.charCode >= 48 && e.charCode <= 57 || e.charCode == [32] || e.charCode == 46);
  }

  syncButtonControl(){
    this._dbPwaService.getMainChartLocalData()
      .then((items:Array<any>)=>{
        if(items.length!==0 ){
          this.localDBEmpty=true;
        }else{
          this.localDBEmpty=false;
        }
      })
    ;
  }

  syncLocal(){
    this._dbPwaService.getMainChartLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.title){
            this.chartLabels=doc;
            if(this.chartLabels._id!=undefined){
              this._mainchartService.updateBigChartLabels(this.chartLabels).subscribe(
                response=>{
                  this.savedLabelsWarn=response.message;
                  this._dbPwaService.clearDbData(doc);
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
            }else{
              this.chartLabels._id=this.idLabel;
              this._mainchartService.saveBigChartLabels(this.chartLabels).subscribe(
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
          if(doc.data){
            this.chartData=doc;
            this._mainchartService.saveBigChartData(this.chartData).subscribe(
              response=>{
                this.savedDataWarn=response.message;
                this._dbPwaService.clearDbData(doc);
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
      e.forEach(element => {
        let myData=JSON.parse(element.data);
        myData=myData.map((element)=>{
          return element = numeral(element).format('0,0');
        });
        var strFinal = myData.join('  --  ');
        showData.push(
          {
            _id:element._id,
            name:element.name,
            data:strFinal,
            target:element.target,
            _rev:element._rev
          }
        );
      });
      this.dataSeriesLocal=showData;
    }
  }

  deleteSeriesLocal(doc){
    this._dbPwaService.clearDbData(doc);
    this.locationReload();
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
    this.okWarning=e.okWarning;
    e.sync? this.sync=false : this.locationReload();
  }
}
