export interface PricePoint {
  price: number;
  lastUpdatedAt: string;
}

export interface PriceHistoryResponse {
  priceHistory: PricePoint[];
}
