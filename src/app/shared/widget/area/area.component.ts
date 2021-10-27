import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainchartService } from '../../../services/mainchart.service'
import { DbPwaService } from '../../../services/db-pwa.service';
import * as numeral from 'numeral';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import theme from 'highcharts/themes/dark-unica';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @Output() dataLabelsId: EventEmitter<any> = new EventEmitter();
  @Output() dataSeries: EventEmitter<any>  = new EventEmitter();
  @Output() dataSeriesLocal: EventEmitter<any> = new EventEmitter();
  @Output() getLocalLabels: EventEmitter<any> = new EventEmitter();

  public findLocation:Number;
  public data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;
  public localLabels:any;
  public localData:any[]=[];
  public localDataDB:any[]=[];

  constructor(
    public _mainchartService: MainchartService,
    private _dbPwaService: DbPwaService
  ) {  }

  ngOnInit(): void {
    this.location();
    this.getMainChartInfo();
    theme(Highcharts);
    this.getLocalData();
  }

  location(){
    let location=window.location.href;
    this.findLocation=location.search('setdata');
  }

  getMainChartInfo(){
    this._mainchartService.getBigChartLabels().subscribe(
      res=>{
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(this.labelsData);
          let dataId=res.data[0]._id;
          this._mainchartService.getAlldata(dataId).subscribe(
            res=>{
              let data=[];
              res.data.forEach(element => {
                data.push({
                  name:element.name,
                  data:JSON.parse(element.data)
                });
              });
              this.setOptions(data,res.labels);
              let dataDB=[];
              res.data.forEach(element => {
                var target=numeral(element.target).format('0,0');
                dataDB.push({
                  serieId:element._id,
                  name:element.name,
                  data:element.data,
                  target:target
                });
              });
              this.dataSeries.emit(dataDB);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
    HC_exporting(Highcharts);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

  getLocalData(){
    this._dbPwaService.getMainChartLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.title){
            this.localLabels=doc;
            this.getLocalLabels.emit(this.localLabels);
          }
          if(doc.data){
            var dataArr=doc.data.split(' ');
            const dataNum= dataArr.map(element => {
              return parseInt(element);
            });
            var localData={
              name:doc.seriesName,
              data:dataNum
            };
            this.localData.push(localData);
            let targetStr=numeral(JSON.stringify(doc.target)).format('0,0');
            let element={
              serieId:doc.seriesName,
              name:doc.seriesName,
              data:JSON.stringify(dataNum),
              target:targetStr,
              _rev:doc._rev,
              _id:doc._id
            }
            this.localDataDB.push(element);
            this.dataSeriesLocal.emit(this.localDataDB);
          }
        });
      })
    ;
  }

  setOptions(data?:any,labels?:any){
    let categoriesStr=labels.categories[0].split(' ');
    var arrCategories=[];
    for(let i=0; i<categoriesStr.length; i++){
      if(categoriesStr[i]!=''){
        arrCategories.push(categoriesStr[i]);
      }
    }
    this.chartOptions= {
      colors: Highcharts.getOptions().colors.map(function(color){
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get('rgb')]
          ]
        };
      }),
      chart: {
        type: 'area'
      },
      title: {
        text: labels.title
      },
      subtitle: {
        text: labels.subTitle
      },
      xAxis: {
        categories: arrCategories,
        tickmarkPlacement: 'on',
        title: {
        text: labels.labelXAxis
        }
      },
      yAxis: {
        title: {
          text: labels.labelYAxis
        },
        labels: {
          formatter: function () {
            return this.value / 1000;
          }
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ' - '+labels.toolTip
      },
      credits:{
        enabled:false
      },
      exporting:{
        enabled:true
      },
      series: data
    };
  }
}
