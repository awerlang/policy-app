import { Observable } from 'rxjs';

export interface ActiveComponent {
  canDeactivate(): Observable<boolean>
}
