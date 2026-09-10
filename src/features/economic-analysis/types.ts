export interface SystemCost {
  systemName: string;
  totalCost: number;
}

export interface CardsInfoItem {
  totalCost: number,
  interceptorsLaunched: number,
  dronsesData: {
      count: number,
      totalCost: number
  },
  budgetVariance: number,
  averageInterceptCost: number
}
