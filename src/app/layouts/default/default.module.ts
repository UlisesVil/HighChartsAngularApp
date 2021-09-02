import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { SetdataComponent } from '../../modules/setdata/setdata.component';
import { PieSetdataComponent } from '../../modules/pie-setdata/pie-setdata.component';
import { TableSetdataComponent } from '../../modules/table-setdata/table-setdata.component';
import { PostsComponent } from '../../modules/posts/posts.component';

import { MainchartService } from '../../services/mainchart.service';
import { PiechartService } from '../../services/piechart.service';
import { TableService } from '../../services/table.service';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    SetdataComponent,
    PieSetdataComponent,
    TableSetdataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    MainchartService,
    PiechartService,
    TableService
  ]
})
export class DefaultModule { }
