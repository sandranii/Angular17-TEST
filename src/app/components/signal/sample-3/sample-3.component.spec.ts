import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample3Component } from './sample-3.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaiwanStockInfoViewModel } from '../../../interfaces';
import { StocksService } from '../../services/stocks.service';
import { of } from 'rxjs';

describe('Sample3Component', () => {
  let component: Sample3Component;
  let fixture: ComponentFixture<Sample3Component>;
  let stocksService: StocksService;

  const fakeStockInfoData: TaiwanStockInfoViewModel[] = [{
    industry_category: "ETF",
    stock_id: "0050",
    stock_name: "元大台灣50",
    type: "twse"
  }];

  const fakeStockPERData: any[] = [{
    date: "2024-03-06",
    stock_id: "2330",
    dividend_yield: 1.77,
    PER: 22.73,
    PBR: 5.51
}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample3Component, HttpClientTestingModule], //導入HttpClientTestingModule
      providers: [StocksService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sample3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();

    stocksService = TestBed.inject(StocksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spyOn: 取得股票資料(TaiwanStockInfo)', () => {    
    // 使用 spyOn 對 service 中的 getTaiwanStockInfo 方法進行模擬
    const spy = spyOn(stocksService,'getTaiwanStockInfo').and.returnValue(of(fakeStockInfoData));

    // 和subscribe後的data去比較
    stocksService.getTaiwanStockInfo().subscribe(data => {
      expect(data).toEqual(fakeStockInfoData);
    })

    // 檢查 getTaiwanStockInfo 是否被調用
    expect(spy).toHaveBeenCalled();
  })

  it('createSpy: 取得PER資料(TaiwanStockPER)', () => {
    // 創建 getTaiwanStockPER 方法的spy對象
    const spy = jasmine.createSpy('getTaiwanStockPER').and.returnValue(of(fakeStockPERData));
    // StocksService 服務中的 getTaiwanStockPER 方法替換為一個由 Jasmine createSpy 方法創建的間諜（spy）對象。
    // 在測試期間控制 getTaiwanStockPER 方法的行為，讓這個方法不會執行其原有的邏輯（例如發起真實的 HTTP 請求），而是返回一個我們預先定義的值，這裡是 of(fakeStockPERData)
    stocksService.getTaiwanStockPER = spy;

    stocksService.getTaiwanStockPER().subscribe(data => {
      expect(data).toEqual(fakeStockPERData);
    })

    // 檢查 getTaiwanStockPER 是否被調用
    expect(spy).toHaveBeenCalled();
  })
});
