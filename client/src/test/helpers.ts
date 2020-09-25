import { Component, NgZone } from '@angular/core'
import { ComponentFixture, TestBed, tick } from '@angular/core/testing'
import { Router } from '@angular/router'

export class PageObject<C> {
    constructor(private fixture: ComponentFixture<C>) {
    }

    query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector)
    }

    queryAll<T>(selector: string): T[] {
        return this.fixture.nativeElement.querySelectorAll(selector)
    }
}

export function sendInput(el: HTMLInputElement, value: string): void {
    el.value = value
    el.dispatchEvent(new Event('input'))
}

@Component({
    template: '<router-outlet></router-outlet>',
})
export class TestContainerComponent { }

export function navigate(...commands: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const router = TestBed.inject(Router)
        const ngZone = TestBed.inject(NgZone);
        ngZone.run(() => router.navigate([...commands]).then(resolve, reject))
        tick()
    })
}
