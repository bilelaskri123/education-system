import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./acceuil/acceuil.module').then((m) => m.AcceuilModule)
  },
  {
    path: 'ecms',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
    // canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
