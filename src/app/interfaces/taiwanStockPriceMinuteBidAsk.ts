/*台股總覽*/
export interface TaiwanStockPriceMinuteBidAsk {
    stock_id: string;
    AskPrice: number[];
    AskVolume: number[];
    BidPrice: number[];
    BidVolume: number[];
    Time: string;
}