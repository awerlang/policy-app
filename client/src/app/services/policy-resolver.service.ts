import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import { PolicyResolve } from '../policy/policy.resolve';
import { PolicyService } from './policy.service';

type ResolvedType = PolicyResolve['policy']

@Injectable({
  providedIn: 'root'
})
export class PolicyResolverService implements Resolve<ResolvedType> {
  constructor(private cs: PolicyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedType> {
    const id = route.paramMap.get('id') ?? '';
    if (!id) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return of({
        effectiveDate: tomorrow.toISOString(),
        status: 'new',
      })
    }

    return this.cs.getPolicy(+id).pipe(
      take(1),
      mergeMap(policy => {
        if (policy) {
          return of(policy);
        } else { // id not found
          this.router.navigate(['/policies']);
          return EMPTY;
        }
      })
    );
  }
}
