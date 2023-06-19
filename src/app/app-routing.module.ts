import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FitxaComponent } from './components/fitxa/fitxa.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
