import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
  effect,
  input,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signal-sample-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signal-sample-select.component.html',
  styleUrl: './signal-sample-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalSampleSelectComponent {
  //sampleCode = input.required<string>;
  private _router: Router = inject(Router);
  sampleCode = input(0);
  selectForm: FormControl = new FormControl(null);

  sampleOption = [
    { key: 1, value: 'counter' },
    { key: 2, value: 'search-user' },
  ];

  constructor() {
    effect(() => {
      const sampleCode: number | null =
        this.sampleCode() != 0 ? this.sampleCode() : null;
      this.selectForm.setValue(sampleCode);
    });
  }

  ngOnInit() {
    this.selectForm.valueChanges.subscribe((res) => {
      this._router.navigate([`signal/demo/sample${res}`]);
    });
  }
}
