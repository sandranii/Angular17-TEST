import { Component, inject } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Observable, of } from 'rxjs';
import { TaiwanStockInfoViewModel, TaiwanStockPriceMinuteBidAsk } from '../../../interfaces';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sample-3',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './sample-3.component.html',
  styleUrl: './sample-3.component.scss'
})
export class Sample3Component {
  #stocksService:StocksService = inject(StocksService);

  stockInfo$: Observable<TaiwanStockInfoViewModel[]|null|undefined> = of([]);
  stockPriceMinuteBidAsk$: Observable<TaiwanStockPriceMinuteBidAsk[]|null|undefined> = of([]);
  stockPER$: Observable<any[]|null|undefined> = of([]);
  

  ngOnInit(): void {
    this.stockInfo$ = this.#stocksService.getTaiwanStockInfo();
    // this.stockPriceMinuteBidAsk$  = this.#stocksService.getTaiwanStockPriceMinuteBidAsk();
    this.stockPER$ = this.#stocksService.getTaiwanStockPER();
  }
  
}
