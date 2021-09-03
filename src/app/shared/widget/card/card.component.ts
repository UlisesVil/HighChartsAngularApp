import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label: any;
  @Input() average: number;
  @Input() percentage: number;
  @Input() target: number;
  @Input() data:[];

  public Highcharts=Highcharts;
  public chartOptions={};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions={
      colors: Highcharts.getOptions().colors.map(function(color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.5).get('rgb')] // darken
          ]
        };
      }),
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth:0,
        margin:[2,2,2,2],
        height: 70
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      xAxis: {
        labels:{
          enabled:false
        },
        title:{
          text:null
        },
        startOnTick:false,
        endOnTick:false,
        tickOptions:[]
      },
      yAxis: {
        labels:{
          enabled:false
        },
        title:{
          text:null
        },
        startOnTick:false,
        endOnTick:false,
        tickOptions:[]
      },
      tooltip: {
        split: false,
        outside:false
      },
      leyend:{
        enabled: false
      },
      credits:{
        enabled:false
      },
      exporting:{
        enabled: true
      },
      legend:{
        enabled:false
      },
      series: [{
        name: this.label,
        data: this.data
      }]
    }

    HC_exporting(this.Highcharts);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }
}
