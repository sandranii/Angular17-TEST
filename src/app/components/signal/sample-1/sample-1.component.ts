import { Component, signal, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalSampleSelectComponent } from '../signal-sample-select/signal-sample-select.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sample-1',
  standalone: true,
  imports: [CommonModule, SignalSampleSelectComponent],
  templateUrl: './sample-1.component.html',
  styleUrl: './sample-1.component.scss',
})
export class Sample1Component {
  count = signal(0);
  double = computed(() => this.count() * 2);

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
  }
}
