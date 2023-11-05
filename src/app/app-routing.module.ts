import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyReceiverComponent } from './my-receiver/my-receiver.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'/login',
  //   pathMatch:'full'
  // },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'my-receiver',
    component: MyReceiverComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
