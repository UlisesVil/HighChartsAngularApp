import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from '../../modules/posts/posts.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from '../../modules/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { SetdataComponent } from '../../modules/setdata/setdata.component';
import { FormsModule } from '@angular/forms';
import { PieSetdataComponent } from '../../modules/pie-setdata/pie-setdata.component';
import { TableSetdataComponent } from '../../modules/table-setdata/table-setdata.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    SetdataComponent,
    PieSetdataComponent,
    TableSetdataComponent,

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
    DashboardService
  ]
})
export class DefaultModule { }
