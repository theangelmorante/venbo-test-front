import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailComponent } from './components/clients/client-detail/client-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  {
    path: 'clients/:id',
    component: ClientDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
