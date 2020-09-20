import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Observable } from 'rxjs';
import { mergeMap, mapTo, defaultIfEmpty } from 'rxjs/operators';

import { ActiveComponent } from 'src/app/components/active-component.service';
import { PolicyService } from '../../services/policy.service';
import { PolicyResolve } from './policy.resolve';

interface ApiError {
  message: string
}

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit, ActiveComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private api: PolicyService,
  ) { }

  fields = {
    id: new FormControl(),
    policyNumber: new FormControl(),
    status: new FormControl({ value: null, disabled: true }),
    effectiveDate: new FormControl(),
    annualPremium: new FormControl(),
  }
  policyForm = new FormGroup(this.fields)

  ngOnInit(): void {
    (this.route.data as Observable<PolicyResolve>)
      .subscribe({
        next: ({ policy }) => {
          this.policyForm.patchValue(policy)
        },
      })
  }

  canDeactivate(): Observable<boolean> {
    if (!this.policyForm.dirty) {
      return of(true)
    }

    const bar = this.snackBar.open(
      `This policy has pending changes. Do you want to discard them?`, 'Yes, Discard',
      {
        duration: 5000,
        verticalPosition: 'top'
      })
    return bar.onAction().pipe(mapTo(true), defaultIfEmpty(false))
  }

  isEdit(): boolean {
    return this.fields.id.value != null
  }

  onSubmit(): void {
    if (!this.policyForm.valid) {
      return
    }
    this.api.save(this.policyForm.value).subscribe({
      next: () => {
        this.router.navigate(['policies'])
      },
      error: (error: ApiError) => {
        this.snackBar.open(error.message, undefined, {
          duration: 4000,
        });
      }
    })
  }

  onDelete(): void {
    // FIXME: policy number could have been changed
    const policyNumber: number = this.fields.policyNumber.value
    const bar = this.snackBar.open(
      `Do you want to delete policy ${policyNumber}?`, 'Yes, Delete',
      {
        duration: 5000,
        verticalPosition: 'top'
      })
    bar.onAction().pipe(mergeMap(() => this.api.delete(this.fields.id.value)))
      .subscribe({
        next: () => {
          this.router.navigate(['policies'])
        },
        error: (error: ApiError) => {
          this.snackBar.open(error.message, undefined, {
            duration: 4000,
          });
        }
      })
  }

}
