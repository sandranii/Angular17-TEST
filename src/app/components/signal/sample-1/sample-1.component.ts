import { Component, signal, computed, effect, input, Input, EventEmitter, Output, runInInjectionContext, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sample-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample-1.component.html',
  styleUrl: './sample-1.component.scss',
})
export class Sample1Component {
  @Input() public testCount = 0;
  @Output() public countChange = new EventEmitter<number>();

  count = signal(0);
  limitMessage = 'Click!';
  double = computed(() => this.count() * 2);
  disabled = signal(false);
  #injector = inject(Injector);

  ngOnInit() {
    // effect(() => {
    //   if (this.count() == 10) {
    //     this.limitMessage = '到達點擊上限';
    //   }
    // }) -----> 一般在constructor 外使用 effect()，會有 NG0203 Error

    // 參考: https://www.danywalls.com/understanding-injectioncontext-and-signal-effects
    // 利用 runInjectionContext 注入 Injector，可以在 constructor 外使用 effect()
    runInInjectionContext(this.#injector, () => {
      effect(
        () => {
          if (this.count() >= 10) {
            this.limitMessage = '到達點擊上限';
            // Update Signals In Effects，需要加入{ allowSignalWrites: true }，避免 NG0600 Error
            this.disabled.update(() => true);
          } else {
            this.limitMessage = 'Click!';
            this.disabled.update(() => false);
          }
        },
        {
          allowSignalWrites: true,
        }
      )
    })
  }

  constructor() {
    effect(() => {
      console.log(this.count(), 'effect');
    });
  }

  reset() {
    this.count.set(0);
  }

  increase() {
    this.count.update((c) => ++c);
    this.testCount++;
    this.countChange.emit(this.testCount);
  }
}
