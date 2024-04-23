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
    await TestBed.configureTestingModule({ //TestBed 具有一個靜態方法 configureTestingModule，接受一個模組定義
      imports: [Sample3Component, HttpClientTestingModule], //導入HttpClientTestingModule
      providers: [StocksService]
    })
    .compileComponents(); //compileComponents 是非同步編譯，將模板文件轉譯成JavaScript代碼。
    
    fixture = TestBed.createComponent(Sample3Component); //1. createComponent 渲染正在測試的組件，2. ComponentFixture 包含了組件，並提供了一個方便的介面給組件實例和已渲染的 DOM
    component = fixture.componentInstance; // 元件實例主要用於設置輸入和訂閱輸出
    const { debugElement } = fixture; // DebugElement 包裹了原生的DOM元素。返回組件的宿主元素
    const { nativeElement } = debugElement; //展開 DebugElement，訪問內部的原生DOM元素
    // console.log('fixture', fixture);
    // console.log('debugElement', debugElement);
    // console.log('nativeElement', nativeElement);

    fixture.detectChanges(); // 必須手動觸發變更檢測，允許以同步的方式測試非同步行為

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
    const spy = jasmine.createSpy('getTaiwanStockPER123').and.returnValue((fakeStockPERData));
    // StocksService 服務中的 getTaiwanStockPER 方法替換為一個由 Jasmine createSpy 方法創建的間諜（spy）對象。
    // 在測試期間控制 getTaiwanStockPER 方法的行為，讓這個方法不會執行其原有的邏輯（例如發起真實的 HTTP 請求），而是返回一個我們預先定義的值，這裡是 of(fakeStockPERData)
    // stocksService.getTaiwanStockPER = spy;

    // stocksService.getTaiwanStockPER().subscribe(data => {
    //   expect(data).toEqual(fakeStockPERData);
    // })
    // spy();
    // spy().subscribe((data:any) => {
    //   expect(data).toEqual(fakeStockPERData);
    // })
    expect(spy()).toEqual((fakeStockPERData));
    // 檢查 getTaiwanStockPER 是否被調用
    expect(spy).toHaveBeenCalled();
  })
});
