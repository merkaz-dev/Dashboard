import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicGraphsComponent } from './basic-graphs/basic.graphs.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: BasicGraphsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
