import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { FitxaComponent } from './fitxa/fitxa.component';
import { StarshipsComponent } from './starships/starships.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { AuthGuard } from '../app/_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'starships',
    component: StarshipsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'fitxa', component: FitxaComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
