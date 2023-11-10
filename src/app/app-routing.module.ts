import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyReceiverComponent } from './my-receiver/my-receiver.component';
import { AuthGuard } from './auth.guard';
import { EditReceiverComponent } from './edit-receiver/edit-receiver.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'myreceiver',
    component: MyReceiverComponent,
    canActivate: [AuthGuard],
    // children: [
    //   { path: 'add', component: AddReceiverComponent },
    // ]
  },
  {
    path:'add',
    component: AddReceiverComponent,
    canActivate: [AuthGuard],
  },
  // ... other routes
  { 
    path: 'edit-receiver/:id',
   component: EditReceiverComponent,
   canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
