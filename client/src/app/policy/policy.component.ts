import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../services/api.service';

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
    private snackBar: MatSnackBar,
    private api: ApiService
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
  }

  onSubmit(): void {
    if (!this.policyForm.valid) {
      return
    }
    this.api.post('policy', this.policyForm.value).subscribe({
      error: (error: ApiError) => {
        this.snackBar.open(error.message, undefined, {
          duration: 4000,
        });
      }
    })
  }

}
