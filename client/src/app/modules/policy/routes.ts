import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateRouteService } from 'src/app/services/can-deactivate-route.service';
import { Resolver } from 'src/app/types/routing';
import { PolicyComponent } from './components/item/policy.component';
import { PolicyResolve } from './components/item/policy.resolve';
import { PolicyListComponent } from './components/list/policy-list.component';
import { PolicyResolverService } from './services/policy-resolver.service';

type PolicyResolver = Resolver<PolicyResolve>

export const routes: Routes = [
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
