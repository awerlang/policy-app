import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyComponent } from './policy/policy.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyResolverService } from './services/policy-resolver.service';

const routes: Routes = [
  { path: 'policies', component: PolicyListComponent },
  { path: 'policies/new', component: PolicyComponent },
  { path: 'policies/:id', component: PolicyComponent, resolve: { policy: PolicyResolverService } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
