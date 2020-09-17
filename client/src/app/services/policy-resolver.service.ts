import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import { PolicyItem } from 'src/shared/types';
import { PolicyService } from './policy.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyResolverService implements Resolve<PolicyItem> {
  constructor(private cs: PolicyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PolicyItem> {
    const id = route.paramMap.get('id') ?? '';

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
