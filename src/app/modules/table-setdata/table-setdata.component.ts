import { Component } from '@angular/core';
import { TableLabelModel, TableDataModel } from '../../models/tableModel';
import { TableService } from '../../services/table.service'

@Component({
  selector: 'app-table-setdata',
  templateUrl: './table-setdata.component.html',
  styleUrls: ['./table-setdata.component.scss']
})
export class TableSetdataComponent {
  public tableLabelLine:TableLabelModel;
  public tableDataLine:TableDataModel;
  public tableLabels:any;
  public idLabel:String;
  public savedLabelsWarn:String;
  public savedDataWarn:String;

  constructor(
    private _tableService: TableService
  ) {
    this.tableLabelLine= new TableLabelModel('','','','');
    this.tableDataLine= new TableDataModel('','','','');
  }

  getIdLabel(e){
    this.idLabel=e._id;
    this.tableLabels=e;
    this.tableLabelLine={
      idLabel:this.tableLabels._id,
      header1:this.tableLabels.header1,
      header2:this.tableLabels.header2,
      header3:this.tableLabels.header3
    };
  }

  onSubmitLabelsTable(tableLabelsForm){
    if(this.idLabel!=undefined){
      this._tableService.updateTableLabels(this.tableLabelLine).subscribe(
        response=>{
          this.savedLabelsWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },1000);
      },err=>{
        console.log(<any>err);
      });
    }else{
      this.tableLabelLine.idLabel=this.idLabel;
      this._tableService.saveTableLabels(this.tableLabelLine).subscribe(
        response=>{
          this.savedLabelsWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },1000);
        },
        err=>{
          console.log(<any>err);
        }
      );
    }
  }

  onsubmitDataTable(Form){
    this.tableDataLine.tableLabelId=this.idLabel;
    this._tableService.saveTableData(this.tableDataLine).subscribe(
      response=>{
        this.savedDataWarn=response.message;
          setTimeout(()=>{
            location.reload();
          },1000);
      },err=>{
        console.log(<any>err);
      }
    );
  }
}
