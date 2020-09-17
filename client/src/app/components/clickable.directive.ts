import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClickable]'
})
export class ClickableDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer'
  }

}
