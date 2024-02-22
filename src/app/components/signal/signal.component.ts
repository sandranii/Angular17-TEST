import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalSampleSelectComponent } from './signal-sample-select/signal-sample-select.component';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [RouterOutlet, SignalSampleSelectComponent],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
})
export class SignalComponent {
  sampleCode: number = 0;
}
