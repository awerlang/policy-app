import { Routes } from '@angular/router';

import { CanDeactivateRouteService } from 'src/app/services/can-deactivate-route.service';
import { Resolver } from 'src/app/types/routing';
import { PolicyResolverService } from '../../services/policy-resolver.service';
import { PolicyComponent } from './policy.component';
import { PolicyResolve } from './policy.resolve';

type PolicyResolver = Resolver<PolicyResolve>

export const routes: Routes = [
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
];
