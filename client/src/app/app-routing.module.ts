import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [
  { path: 'policies', component: PolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
