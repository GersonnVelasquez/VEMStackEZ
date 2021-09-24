import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NoAuthGuard } from './core/guard/no-auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./feature/login/login.module').then(mod => mod.LoginModule)},
  { path: 'Home', loadChildren: () => import('./feature/home/home.module').then(mod => mod.HomeModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
