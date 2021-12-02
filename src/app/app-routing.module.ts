import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: 'Login', loadChildren: () => import('./feature/login/login.module').then(mod => mod.LoginModule)},
  { path: 'Home', loadChildren: () => import('./feature/home/home.module').then(mod => mod.HomeModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
