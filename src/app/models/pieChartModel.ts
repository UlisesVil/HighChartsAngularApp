export class PieChartLabelsModel {
  constructor(
    public _id:String,
    public title:String,
    public valueSufix:String,
    public seriesName:String
  ){}
}

export class PieChartDataModel {
  constructor(
    public chartlabelId:String,
    public pieceName:String,
    public percentage:String
  ){}
}
