import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ActiveComponent } from './components/active-component.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateRouteService implements CanDeactivate<ActiveComponent> {

  canDeactivate(
    component: ActiveComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate()
  }
}
