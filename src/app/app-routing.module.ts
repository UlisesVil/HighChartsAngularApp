import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { SetdataComponent } from './modules/setdata/setdata.component';
import { PieSetdataComponent } from './modules/pie-setdata/pie-setdata.component';



const routes: Routes = [
  {path:'', component: DefaultComponent,
    children:[
      {path:'', component:DashboardComponent},
      {path:'posts',component:PostsComponent},
      {path:'setdata',component:SetdataComponent},
      {path:'pie-setdata', component:PieSetdataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
