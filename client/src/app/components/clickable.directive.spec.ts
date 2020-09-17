import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ClickableDirective } from './clickable.directive';

@Component({
  template: '<div appClickable></div>'
})
export class DummyComponent { }

describe('ClickableDirective', () => {
  let fixture: ComponentFixture<DummyComponent>

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DummyComponent, ClickableDirective],
    }).createComponent(DummyComponent);
  });

  it('should display a pointer', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const cursor = div.style.cursor;
    expect(cursor).toBe('pointer');
  });
});
