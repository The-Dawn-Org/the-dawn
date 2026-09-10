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

export interface DrownToInterceptorType {
  date: Date;
  dronesTotalCost: number;
  interceptorsTotalCost: number;
}

export interface AccumulativeExpensePoint {
  date: string;
  number: number;
}

export interface BudgetByDateResponse {
  date: string;
  budget: number;
}
