import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Resolver } from './types/routing';
import { PolicyComponent } from './policy/policy.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyResolverService } from './services/policy-resolver.service';
import { CanDeactivateRouteService } from './can-deactivate-route.service';
import { PolicyResolve } from './policy/policy.resolve';

type PolicyResolver = Resolver<PolicyResolve>

const routes: Routes = [
  {
    path: 'policies',
    children: [
      { path: '', component: PolicyListComponent },
      {
        path: 'new',
        component: PolicyComponent,
        canDeactivate: [CanDeactivateRouteService],
        resolve: { policy: PolicyResolverService } as PolicyResolver,
      },
      {
        path: ':id',
        component: PolicyComponent,
        canDeactivate: [CanDeactivateRouteService],
        resolve: { policy: PolicyResolverService } as PolicyResolver,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
