import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function findEl<T>(
    fixture: ComponentFixture<T>,
    testId: string
): DebugElement {
    return fixture.debugElement.query(
        By.css(`[data-testid="${testId}"]`)
    )
}

export function findComponent<T>(
    fixture: ComponentFixture<T>,
    selector: string
): DebugElement {
    return fixture.debugElement.query(By.css(selector));
}

export function click<T>(
    fixture: ComponentFixture<T>,
    testId: string
): void {
    const element = findEl(fixture, testId);
    const event = makeClickEvent(element.nativeElement);
    element.triggerEventHandler('click', event);
}

/**建一個假的點擊事件物件(只包含重要的方法、屬性) */
export function makeClickEvent(
    target: EventTarget
): Partial<MouseEvent> {
    return {
        preventDefault(): void {},
        stopPropagation(): void {},
        stopImmediatePropagation(): void {},
        type: 'click',
        target,
        currentTarget: target,
        bubbles: true,
        cancelable: true,
        button: 0,
    };
}

export function expectText<T>(
    fixture: ComponentFixture<T>,
    testId: string,
    text: string
): void {
    const element = findEl(fixture, testId);
    const actualText = element.nativeElement.textContent;
    expect(actualText).toBe(text);
}