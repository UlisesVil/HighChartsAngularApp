import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarOutPut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.toggleSideBarOutPut.emit(1);

    setTimeout(()=>{  //hace que los elementos se ajusten
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

}
