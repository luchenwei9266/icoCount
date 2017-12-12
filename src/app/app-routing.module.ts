import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AddComponent } from './add/add.component';
import { AddIcoComponent } from './add-ico/add-ico.component';
import { IcoInfoComponent } from './ico-info/ico-info.component';
 
const appRoutes: Routes = [
  { path: '',redirectTo: '/addUser',pathMatch: 'full'},
  { path: 'addUser',component: AddComponent },
  { path: 'addICO',component: AddIcoComponent }, 
  { path: 'ICOInfo',component: IcoInfoComponent },   
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}