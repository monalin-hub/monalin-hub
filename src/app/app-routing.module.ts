import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './homepage/Component/dashboard/dashboard.component';

const routes: Routes = [ 
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'dashboard',  component: DashboardComponent }
/*{
  path: 'dashboard',
  canActivate: [AuthGuard],
  loadChildren: () =>
    import('./homepage/homepage.module').then((m) => m.HomepageModule),
}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
