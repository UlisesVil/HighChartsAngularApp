import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainchartService } from '../../../services/mainchart.service'
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
  public title:String;
  public data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;

  constructor(
    public _mainchartService: MainchartService
  ) { }

  ngOnInit(): void {
    this.getMainChartInfo();
    theme(Highcharts);
  }

  getMainChartInfo(){
    this._mainchartService.getBigChartLabels().subscribe(
      res=>{
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
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
                dataDB.push({
                  serieId:element._id,
                  name:element.name,
                  data:element.data
                });
              });
              this.dataSeries.emit(dataDB);
            },err=>{
              console.log(<any>err);
            }
          );
        }
      },
      err=>{
        console.log(<any>err);
      }
    );

    HC_exporting(Highcharts);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

  setOptions(data?:any,labels?:any){
    this.chartOptions= {
      colors: Highcharts.getOptions().colors.map(function(color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
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
        //categories: ['enero', '1800', '1850', '1900', '1950', '1999', '2050'],
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
