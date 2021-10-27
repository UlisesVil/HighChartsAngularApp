import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PiechartService } from '../../../services/piechart.service';
import { BdPwaPieService } from '../../../services/bd-pwa-pie.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import theme from 'highcharts/themes/dark-unica';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Output() dataLabelsId: EventEmitter<any>= new EventEmitter();
  @Output() dataSeries: EventEmitter<any>= new EventEmitter();
  @Output() getLocalLabels: EventEmitter<any>= new EventEmitter();
  @Output() dataSeriesLocal: EventEmitter<any>= new EventEmitter();

  public data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;
  public findLocation:number;
  public localLabels:any;
  public localDataDB:any[]=[];

  constructor(
    public _piechartService: PiechartService,
    private _bdPwaPieService: BdPwaPieService
  ) { }

  ngOnInit(): void {
    this.location();
    this.getPieChartInfo();
    theme(Highcharts);
    this.getLocalData();
  }

  location(){
    let location=window.location.href;
    this.findLocation=location.search('pie-setdata');
  }

  getPieChartInfo(){
    this._piechartService.getPieChartLabels().subscribe(
      res=>{
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
          let dataId=res.data[0]._id;
          this._piechartService.getAllpiedata(dataId).subscribe(
            res=>{
              let data=[];
              res.data.forEach(element => {
                data.push({
                  name:element.pieceName,
                  y:JSON.parse(element.percentage)
                })
              });
              this.data=data;
              this.setOptions(data, res.labels);
              let dataDB=[];
              res.data.forEach(element => {
                dataDB.push({
                  serieId:element._id,
                  pieceName:element.pieceName,
                  percentage:element.percentage
                })
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
    this._bdPwaPieService.getPieChartLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.title){
            this.localLabels=doc;
            this.getLocalLabels.emit(this.localLabels);
          }
          if(doc.pieceName){
            let element={
              serieId:doc.pieceName,
              pieceName:doc.pieceName,
              percentage:JSON.stringify(doc.percentage),
              _rev:doc._rev
            }
            this.localDataDB.push(element);
            this.dataSeriesLocal.emit(this.localDataDB);
          }
        });
      })
    ;
  }

  setOptions(data?:any, labels?:any){
    this.chartOptions={
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
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: labels.title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: labels.valueSufix
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        }
      },
      credits:{
        enabled:false
      },
      series: [{
        name: labels.seriesName,
        data: data
      }]
    };
  }
}
