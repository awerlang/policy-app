import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PolicyItem, PolicyListItem } from 'src/shared/types';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private api: ApiService) { }

  getPolicies(): Observable<PolicyListItem[]> {
    return this.api.get<PolicyListItem[]>('policy')
  }

  getPolicy(id: number): Observable<PolicyListItem> {
    return this.api.get<PolicyListItem>('policy', id)
  }

  save(policy: PolicyItem): Observable<PolicyItem> {
    return this.api.post('policy', policy)
  }

  delete(id: number): Observable<PolicyItem> {
    return this.api.delete('policy', id)
  }
}
