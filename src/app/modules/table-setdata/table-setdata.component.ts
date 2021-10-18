import { Component } from '@angular/core';
import { TableLabelModel, TableDataModel } from '../../models/tableModel';
import { TableService } from '../../services/table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public tableLabelsForm: FormGroup;
  public tableDataForm: FormGroup;

  constructor(
    private _tableService: TableService,
    private _formBuilder: FormBuilder
  ) {
    this.tableLabelLine= new TableLabelModel('','','','');
    this.tableDataLine= new TableDataModel('','','','');
    this.tableLabelsCreate();
    this.tableDataCreate();
  }

  tableLabelsCreate(){
    this.tableLabelsForm = this._formBuilder.group({
      header1: [this.tableLabelLine.header1, [Validators.required]],
      header2: [this.tableLabelLine.header2, [Validators.required]],
      header3: [this.tableLabelLine.header3, [Validators.required]]
    });
  }

  tableDataCreate(){
    this.tableDataForm = this._formBuilder.group({
      dataH1: ['', [Validators.required]],
      dataH2: ['', [Validators.required]],
      dataH3: ['', [Validators.required]]
    });
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
    this.tableLabelsCreate();
  }

  onSubmitLabelsTable(){
    if(this.tableLabelsForm.valid){
      this.tableLabelLine={
        idLabel: this.idLabel,
        header1: this.tableLabelsForm.value.header1,
        header2: this.tableLabelsForm.value.header2,
        header3: this.tableLabelsForm.value.header3
      }

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
  }

  onsubmitDataTable(){

    if(this.tableDataForm.valid){
      this.tableDataLine={
        tableLabelId: this.idLabel,
        dataH1: this.tableDataForm.value.dataH1,
        dataH2: this.tableDataForm.value.dataH2,
        dataH3: this.tableDataForm.value.dataH3
      }

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
}
