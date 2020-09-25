import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { navigate, PageObject, sendInput, TestContainerComponent } from 'src/test/helpers';
import { PolicyListItem } from 'src/shared/types';
import { PolicyComponent } from './policy.component';
import { routes } from './routes';

class PolicyPageObject extends PageObject<TestContainerComponent> {
  get policyNumberTxt(): HTMLInputElement {
    return this.query('.policy-number-txt')
  }

  get deleteBtn(): HTMLButtonElement {
    return this.query('.delete-btn')
  }

  get saveBtn(): HTMLButtonElement {
    return this.query('.save-btn')
  }
}

describe('PolicyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'policies',
          children: routes,
        }]),
        MatSnackBarModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
      ],
      declarations: [
        TestContainerComponent,
        PolicyComponent,
      ],
    }).compileComponents();
  });

  let rootFixture: ComponentFixture<TestContainerComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    rootFixture = TestBed.createComponent(TestContainerComponent);
    rootFixture.autoDetectChanges()
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create', () => {
    const component = TestBed.createComponent(PolicyComponent)
    expect(component).toBeTruthy();
  });

  describe('new policy', () => {
    let component: PolicyComponent;
    let page: PolicyPageObject;

    beforeEach(fakeAsync(() => {
      navigate('policies', 'new')
      component = rootFixture.debugElement.query(By.directive(PolicyComponent)).componentInstance
      page = new PolicyPageObject(rootFixture)
    }))

    it('starts out in invalid state', () => {
      expect(component.policyForm.dirty).toBe(false)
      expect(component.policyForm.valid).toBe(false)
    })

    it('defaults to effective tomorrow', () => {
      expect(component.fields.effectiveDate.value).not.toBeNull()
    })

    it('cannot be deleted', () => {
      expect(page.deleteBtn).toBeNull()
    })
  })

  describe('existing policy', () => {
    let component: PolicyComponent;
    let page: PolicyPageObject;

    beforeEach(fakeAsync(() => {
      const mockPolicy: PolicyListItem = {
        id: 1,
        policyNumber: 'A-100100',
        annualPremium: 1200,
        effectiveDate: new Date().toISOString(),
        status: '',
      }

      navigate('policies', '1')

      const req = httpTestingController.expectOne('/api/policy/1')
      expect(req.request.method).toBe('GET')
      req.flush(mockPolicy)

      component = rootFixture.debugElement.query(By.directive(PolicyComponent)).componentInstance
      page = new PolicyPageObject(rootFixture)
    }))

    it('starts out in valid state', () => {
      expect(component.policyForm.dirty).toBe(false)
      expect(component.policyForm.valid).toBe(true)
      expect(page.deleteBtn).toBeTruthy()
      expect(page.saveBtn.disabled).toBe(false)
    })

    it('can be deleted', () => {
      expect(page.deleteBtn).toBeTruthy()
    })

    describe('when invalid', () => {
      it('cannot be saved', () => {
        sendInput(page.policyNumberTxt, '')
        rootFixture.detectChanges()

        expect(component.policyForm.valid).toBe(false)
        expect(page.saveBtn.disabled).toBe(true)
        page.saveBtn.click()
        httpTestingController.expectNone('/api/policy')
      })
    })

    describe('when unchanged', () => {
      it('can navigate away', fakeAsync(async () => {
        expect(await navigate('')).toBe(true)
      }))
    })

    describe('when changed', () => {
      beforeEach(() => {
        sendInput(page.policyNumberTxt, 'A-100101')
        rootFixture.detectChanges()
      })

      it('changed policy warns against navigation', fakeAsync(async () => {
        tick(Infinity)

        expect(await navigate('')).toBe(false)
      }))

      it('confirming navigation navigates away', fakeAsync(async () => {
        const promise = navigate('')
        TestBed.inject(MatSnackBar)._openedSnackBarRef?.dismissWithAction()

        expect(await promise).toBe(true)
      }))

      it('can save policy in valid state', () => {
        page.saveBtn.click()
        const req = httpTestingController.expectOne('/api/policy')
        expect(req.request.method).toBe('POST')
      })

      it('notifies errors when saving', () => {
        const snackBar = TestBed.inject(MatSnackBar)
        jest.spyOn(snackBar, 'open')

        page.saveBtn.click()
        const req = httpTestingController.expectOne('/api/policy')
        expect(req.request.method).toBe('POST')
        req.flush({ message: 'Some error' }, { status: 400, statusText: 'Bad Request' })

        expect(snackBar.open).toHaveBeenCalledWith('Some error', undefined, { duration: 4000 })
      })

      it('navigates to policies listing after saving', () => {
        const router = TestBed.inject(Router)
        jest.spyOn(router, 'navigate')
        page.saveBtn.click()
        const req = httpTestingController.expectOne('/api/policy')
        expect(req.request.method).toBe('POST')
        rootFixture.ngZone?.run(() => req.flush({}))

        expect(router.navigate).toHaveBeenCalledWith(['policies'])
      })

      it('navigates to policies listing after deleting', () => {
        const router = TestBed.inject(Router)
        jest.spyOn(router, 'navigate')
        page.deleteBtn.click()
        TestBed.inject(MatSnackBar)._openedSnackBarRef?.dismissWithAction()
        const req = httpTestingController.expectOne('/api/policy/1')
        expect(req.request.method).toBe('DELETE')
        rootFixture.ngZone?.run(() => req.flush({}))

        expect(router.navigate).toHaveBeenCalledWith(['policies'])
      })
    })
  })

});
