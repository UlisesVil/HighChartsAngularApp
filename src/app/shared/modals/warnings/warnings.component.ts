import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent implements OnInit {
  @Input() okWarning:String[];
  @Input() errorWarning:String;
  @Input() sync:boolean;
  @Output() deactivateErrorMessage:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  modalOff(){
    this.deactivateErrorMessage.emit({
      modal:false,
      errorWarning:null,
      okWarning:null,
      sync:this.sync
    });
  }
}
