import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';

import { PolicyService } from '../services/policy.service';

interface ApiError {
  message: string
}

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private api: PolicyService
  ) { }

  fields = {
    id: new FormControl(),
    policyNumber: new FormControl(),
    status: new FormControl({ value: 'New', disabled: true }),
    effectiveDate: new FormControl(),
    annualPremium: new FormControl(),
  }
  policyForm = new FormGroup(this.fields)

  ngOnInit(): void {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.fields.effectiveDate.setValue(tomorrow)

    this.route.data
      .subscribe({
        next: ({ policy }) => {
          this.policyForm.setValue(policy)
        },
      })
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
    const policyNumber: number = this.fields.policyNumber.value
    const bar = this.snackBar.open(
      `Are you sure you want to delete policy ${policyNumber}?`, 'Yes, Delete',
      {
        duration: 5000,
        verticalPosition: 'top'
      })
    bar.onAction().pipe(mergeMap(() => this.api.delete(this.policyForm.value)))
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
