import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [

  {
    path: '', component : PublicComponent,
    children : [
      {path: '' ,     component:  HomeComponent},
      {path: 'login', component:  LoginComponent}
    ]
  },
  {
    path : 'secure' , component : SecureComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
