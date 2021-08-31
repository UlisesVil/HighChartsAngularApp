import { Component, OnInit } from '@angular/core';
import { TableLabelModel, TableDataModel } from '../../models/tableModel';
import { DashboardService } from '../dashboard.service';




@Component({
  selector: 'app-table-setdata',
  templateUrl: './table-setdata.component.html',
  styleUrls: ['./table-setdata.component.scss']
})
export class TableSetdataComponent implements OnInit {
  public tableLabelLine:TableLabelModel;
  public tableDataLine:TableDataModel;

  public tableLabels:any;

  public idLabel:String;
  public savedWarn:String;

  constructor(
    private _dashboardService: DashboardService
  ) {
    this.tableLabelLine= new TableLabelModel('','','','');
    this.tableDataLine= new TableDataModel('','','','');
  }

  ngOnInit(): void {
  }

  dataSeriesOutput(e){
    console.log(e);
  }

  getIdLabel(e){
    console.log(e);
    console.log(e._id);
    this.idLabel=e._id;
    this.tableLabels=e;
    console.log(this.tableLabels);
    this.tableLabelLine.idLabel=this.tableLabels._id;
    this.tableLabelLine.header1=this.tableLabels.header1;
    this.tableLabelLine.header2=this.tableLabels.header2;
    this.tableLabelLine.header3=this.tableLabels.header3;

  }

  onSubmitLabelsTable(tableLabelsForm){
    console.log(this.tableLabelLine);
    if(this.idLabel!=undefined){
      console.log('esta es la idLabel'+this.idLabel);
      this._dashboardService.updateTableLabels(this.tableLabelLine).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);
          // setTimeout(()=>{
          //   location.reload();
          // },3000);

      },err=>{
        console.log(<any>err);

      });

    }else{
      console.log('no hay idLAbel');
      this.tableLabelLine.idLabel=this.idLabel;
      this._dashboardService.saveTableLabels(this.tableLabelLine).subscribe(
        response=>{
          this.savedWarn=response.message;
          console.log(response);

          // setTimeout(()=>{
          //   location.reload();
          // },3000);

        },err=>{
          console.log(<any>err);

        });
    }
  }

  onsubmitDataTable(Form){
    this.tableDataLine.tableLabelId=this.idLabel;
    console.log(this.tableDataLine);

    this._dashboardService.saveTableData(this.tableDataLine).subscribe(
      response=>{
        console.log(response);
        this.savedWarn=response.message;
          //console.log(response);

          // setTimeout(()=>{
          //   location.reload();
          // },3000);

      },err=>{
        console.log(<any>err);
      });
  }

}
