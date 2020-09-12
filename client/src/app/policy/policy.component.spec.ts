import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PolicyComponent } from './policy.component';

describe('PolicyComponent', () => {
  let component: PolicyComponent;
  let fixture: ComponentFixture<PolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ PolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
