import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() toggleSideBarOutPut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  toggleSideBar(){
    this.toggleSideBarOutPut.emit();
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }
}
