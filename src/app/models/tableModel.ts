export class TableLabelModel {
  constructor(
    public idLabel:String,
    public header1:String,
    public header2:String,
    public header3:String
  ){}
}


export class TableDataModel {
  constructor(
    public tableLabelId:String,
    public dataH1:String,
    public dataH2:String,
    public dataH3:String
  ){}
}
