export class MainChartLabelsModel{
  constructor(
    public idLabel:String,
    public title:String,
    public subTitle:String,
    public labelXAxis:String,
    public labelYAxis:String,
    public toolTip:String,
  ){ }
}

export class MainChartDataModel{
  constructor(
    public chartlabelId:String,
    public seriesName:String,
    public data:String,
    public target:String
  ){ }
}
