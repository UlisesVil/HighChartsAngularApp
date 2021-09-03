import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
public date:any;

  constructor() { }

  ngOnInit(): void {
    this.date= Date.now();
  }

}
