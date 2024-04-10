import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { RequestConfigView, TaiwanStockInfoViewModel, TaiwanStockPriceMinuteBidAsk } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  #_httpClient: HttpClient = inject(HttpClient);

  stockUrl: string = 'https://api.finmindtrade.com/api/v3/data';

  constructor() { }

  getTaiwanStockInfo(): Observable<TaiwanStockInfoViewModel[]|null|undefined> {
    let params = new HttpParams( { fromObject: { dataset: 'TaiwanStockInfo' } });
    return this.taiwanStocksCommon<TaiwanStockInfoViewModel[]>(this.stockUrl, params);
  }

  getTaiwanStockPriceMinuteBidAsk(): Observable<TaiwanStockPriceMinuteBidAsk[]|null|undefined> {
    let params = new HttpParams({ fromObject: {
      dataset: 'TaiwanStockPriceMinuteBidAsk',
      stock_id: '2330',
    }})
    return this.taiwanStocksCommon<TaiwanStockPriceMinuteBidAsk[]>(this.stockUrl, params);
  }

  getTaiwanStockPER(): Observable<any[]|null|undefined> {
    let params = new HttpParams({ fromObject: {
      dataset: 'TaiwanStockPER',
      stock_id: '2330',
      date: '2024-03-06'
    }})
    return this.taiwanStocksCommon<any[]>(this.stockUrl, params);
  }

  /**共用呼叫函式 */
  taiwanStocksCommon<T>(stockUrl: string, params: HttpParams): Observable<T|null|undefined> {
    return this.#_httpClient.get<RequestConfigView<T>>(stockUrl, { params} ).pipe(
      switchMap((res) => {
        if(res.msg == 'success') {
          return of(res.data);
        }
        return of(null);
      })
    );
  }
}
