import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

      {
        path: '',
        // canActivateChild: [AuthGuard],
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'admin',
  //       canActivateChild: [AuthGuard],
  //       loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  //     },
  //     {
  //       path: 'report',
  //       canActivateChild: [AuthGuard],
  //       loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  //     }
  //   ]
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
