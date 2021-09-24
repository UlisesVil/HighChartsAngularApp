import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainchartService } from '../../../services/mainchart.service'
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import theme from 'highcharts/themes/dark-unica';
import * as numeral from 'numeral';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  @Output() dataLabelsId: EventEmitter<any> = new EventEmitter();
  @Output() dataSeries: EventEmitter<any>  = new EventEmitter();
  public findLocation:Number;
  public data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;

  constructor(
    public _mainchartService: MainchartService
  ) { }

  ngOnInit(): void {
    this.location();
    this.getMainChartInfo();
    theme(Highcharts);
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
                var target=numeral(element.target).format('0,0');
                dataDB.push({
                  serieId:element._id,
                  name:element.name,
                  data:element.data,
                  target:target
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
