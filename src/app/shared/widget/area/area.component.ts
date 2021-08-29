import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from '../../../modules/dashboard.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  providers:[ DashboardService ]
})
export class AreaComponent implements OnInit {
  public title:String;
  @Output() dataLabelsId: EventEmitter<any> = new EventEmitter();
  @Output() dataSeries: EventEmitter<any>  = new EventEmitter();

  data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;
  //data:any;

  constructor(
    public _dashboardService: DashboardService
  ) { }


  ngOnInit(): void {


    this.getMainChartInfo();


  }

  getMainChartInfo(){

    this._dashboardService.getBigChartLabels().subscribe(
      res=>{
        console.log(res.data);
        console.log(res);

        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
          let dataId=res.data[0]._id;

          this._dashboardService.getAlldata(dataId).subscribe(
            res=>{
              console.log(res);
              let data=[];
              res.data.forEach(async element => {
                await data.push({
                name:element.name,
                data:JSON.parse(element.data)
                })
              });
              this.setOptions(data,res.labels);
              console.log(JSON.stringify(data[0].data));
              let dataDB=[];
              res.data.forEach(async element => {
                await dataDB.push({
                  serieId:element._id,
                  name:element.name,
                  data:element.data
                })
              });
              this.dataSeries.emit(dataDB);
              console.log(dataDB);
            },err=>{
              console.log(<any>err);
            }
          );
        }
      },err=>{
        console.log(<any>err);
      }
    );

    HC_exporting(Highcharts); //this adds export Options (save)
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }


  setOptions(data?:any,labels?:any){

    this.chartOptions= {
      // colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      //   return {
      //       radialGradient: {
      //           cx: 0.5,
      //           cy: 0.3,
      //           r: 0.7
      //       },
      //       stops: [
      //           [0, color],
      //           [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
      //       ]
      //   };
      // }),
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
        //categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        //tickmarkPlacement: 'on',
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
        valueSuffix: labels.toolTip
      },
      // plotOptions: {
      //     area: {
      //         stacking: 'normal',
      //         lineColor: '#666666',
      //         lineWidth: 1,
      //         marker: {
      //             lineWidth: 1,
      //             lineColor: '#666666'
      //         }
      //     }
      // },
      credits:{  //added
        enabled:false
      },
      exporting:{ //added
        enabled:true
      },
      series: data
    };

  }
}
