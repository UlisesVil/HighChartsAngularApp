export class MainChartLabelsModel{
  constructor(
    public _id:String,
    public title:String,
    public subTitle:String,
    public labelXAxis:String,
    public labelYAxis:String,
    public toolTip:String,
    public categories:String
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
