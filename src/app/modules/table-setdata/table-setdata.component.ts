import { Component, OnInit, ViewChild } from '@angular/core';
import { TableLabelModel, TableDataModel } from '../../models/tableModel';
import { TableService } from '../../services/table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BdPwaTableService } from '../../services/bd-pwa-table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataInterface } from '../../interfaces/tabledata-interface';
import uniqid from 'uniqid';

@Component({
  selector: 'app-table-setdata',
  templateUrl: './table-setdata.component.html',
  styleUrls: ['./table-setdata.component.scss']
})
export class TableSetdataComponent implements OnInit{
  //Offline Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['position', 'dataH1', 'dataH2', 'dataH3'];
  public ELEMENT_DATA: TableDataInterface[];
  public dataSource:any;
  public localDBEmpty:boolean=false;
  public localLabels:any={header1:'--',header2:'--',header3:'--'};
  public localData:any[];

  //Online Table
  public tableLabelLine:TableLabelModel;
  public tableDataLine:TableDataModel;
  public tableLabels:any;
  public idLabel:String;
  public savedLabelsWarn:String;
  public savedDataWarn:String;
  public tableLabelsForm: FormGroup;
  public tableDataForm: FormGroup;

  //Modal
  public okWarning:String[];
  public errorWarning:String;
  public modal: boolean=false;
  public sync:boolean=false;

  constructor(
    private _tableService: TableService,
    private _formBuilder: FormBuilder,
    private _bdPwaTableService: BdPwaTableService
  ) {
    this.tableLabelLine= new TableLabelModel('','','','');
    this.tableDataLine= new TableDataModel('','','','');
    this.tableLabelsCreate();
    this.tableDataCreate();
  }

  ngOnInit():void {
    this.syncButtonControl();
  }

  locationReload(){
    setTimeout(()=>{
      location.reload();
    },1000);
  }

  syncButtonControl(){
    this._bdPwaTableService.getTableLocalData()
      .then((items:Array<any>)=>{
        if(items.length!==0 ){
          this.localDBEmpty=true;
        }else{
          this.localDBEmpty=false;
        }
      })
    ;
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
            this.locationReload();
          },
          error=>{
            if(<any>error){
              console.log(<any>error);
            };
            this.okWarning=[
              "You Don't have Internet Connection.",
              "All changes will be saved in cache.",
              "The changes will be applied when Internet comes back and you activate the sync button."
            ];
            this.modal=true;
            const tableLablesLocal= {...this.tableLabelLine,_id:this.tableLabelLine.idLabel}
            this._bdPwaTableService.saveLocalTableLabels(tableLablesLocal);
          }
        );
      }else{
        this.tableLabelLine.idLabel=this.idLabel;
        this._tableService.saveTableLabels(this.tableLabelLine).subscribe(
          response=>{
            this.savedLabelsWarn=response.message;
            this.locationReload();
          },
          error=>{
            console.log(<any>error);
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
          this.locationReload();
        },
        error=>{
          if(<any>error){
            console.log(<any>error);
          };
          this.okWarning=[
            "You Don't have Internet Connection.",
            "All changes will be saved in cache.",
            "The changes will be applied when Internet comes back and you activate the Sync button."
          ];
          this.modal=true;
          const tableDataLocal= {...this.tableDataLine,_id: uniqid('local-')}
          this._bdPwaTableService.saveLocalTableData(tableDataLocal);
        }
      );
    }
  }

  syncLocal(){
    this._bdPwaTableService.getTableLocalData()
      .then((items:Array<any>)=>{
        items.forEach(({doc})=>{
          if(doc.header1){
            this.tableLabelLine=doc;
            if(this.tableLabels._id!=undefined){
              this._tableService.updateTableLabels(this.tableLabelLine).subscribe(
                response=>{
                  this.savedLabelsWarn=response.message;
                  this._bdPwaTableService.clearTableLocalDB(doc);
                  this.locationReload();
                },
                error=>{
                  if(<any>error){
                    console.log(<any>error);
                  };
                  this.okWarning=[
                    "You Don't have Internet Connection.",
                    "All changes will be saved in cache.",
                    "The changes will be applied when Internet comes back and you activate the Sync button."
                  ];
                  this.modal=true;
                }
              );
            }else{
              this.tableLabelLine.idLabel=this.idLabel;
              this._tableService.saveTableLabels(this.tableLabelLine).subscribe(
                response=>{
                  this.savedLabelsWarn=response.message;
                  this.locationReload();
                },
                error=>{
                  if(<any>error){
                    console.log(<any>error);
                  };
                  this.okWarning=[
                    "You Don't have Internet Connection.",
                    "All changes will be saved in cache.",
                    "The changes will be applied when Internet comes back and you activate the Sync button."
                  ];
                  this.modal=true;
                }
              );
            }
          }
          if(doc.dataH1){
            this.tableDataLine=doc;
            this._tableService.saveTableData(this.tableDataLine).subscribe(
              response=>{
                this.savedDataWarn=response.message;
                this._bdPwaTableService.clearTableLocalDB(doc);
                this.locationReload();
              },
              error=>{
                if(<any>error){
                  console.log(<any>error);
                };
                this.okWarning=[
                  "You Don't have Internet Connection.",
                  "All changes will be saved in cache.",
                  "The changes will be applied when Internet comes back and you activate the Sync button."
                ];
                this.modal=true;
              }
            );
          }
        });
      })
    ;
  }

  getdataLocal(e){
    this.localData=e;
    let data=[];
    let counter=0;
    this.localData.forEach(element => {
      data.push(
        {
          position:"value: "+ (counter+=1),
          dataH1:element.dataH1,
          dataH2:element.dataH2,
          dataH3:element.dataH3,
          _id:element._id,
          _rev:element._rev
        }
      )
    });
    this.ELEMENT_DATA=data;
    this.dataSource = new MatTableDataSource<TableDataInterface>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  getLabelsLocal(e){
    this.localLabels=e;
  }

  deleteSeriesLocal(doc){
    this._bdPwaTableService.clearTableLocalDB(doc);
    this.locationReload();
  }

  modalOff(e){
    this.modal=e.modal;
    this.errorWarning=e.errorWarning;
    this.okWarning=e.okWarning;
    e.sync? this.sync=false : this.locationReload();
  }
}
