import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { PiechartService } from '../../../services/piechart.service';
import theme from 'highcharts/themes/dark-unica';


@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Output() dataLabelsId: EventEmitter<any>= new EventEmitter();
  @Output() dataSeries: EventEmitter<any>= new EventEmitter();

  data=[];
  public chartOptions:{};
  public Highcharts= Highcharts;
  public labelsData:any;
  //public theme:any;

  constructor(
    public _piechartService: PiechartService
  ) {

   }

  ngOnInit(): void {
   this.getPieChartInfo();
   theme(Highcharts);

  }


  getPieChartInfo(){
    this._piechartService.getPieChartLabels().subscribe(
      res=>{
        console.log(res.data);
        console.log(res);
        if(res.data[0]!=undefined){
          this.labelsData=res.data[0];
          this.dataLabelsId.emit(res.data[0]);
          let dataId=res.data[0]._id;

          this._piechartService.getAllpiedata(dataId).subscribe(
            res=>{
              console.log(res);
              let data=[];
              res.data.forEach(async element => {
                await data.push({
                name:element.pieceName,
                y:JSON.parse(element.percentage)
                })
              });
              console.log(data);
              this.data=data;
              this.setOptions(data, res.labels);

              //console.log(JSON.stringify(data[0].data));
              let dataDB=[];
              res.data.forEach(async element => {
                await dataDB.push({
                  serieId:element._id,
                  pieceName:element.pieceName,
                  percentage:element.percentage
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



  setOptions(data?:any, labels?:any){

    //Highcharts.setOptions({

    //});
    console.log(data);
    console.log(labels);




    this.chartOptions={
      colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
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
      series: [{
        name: labels.seriesName,
        data: data
      }]
    };
  }

}
