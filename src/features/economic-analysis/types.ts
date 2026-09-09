export interface CostBySystemItem {
  system: string;
  cost: number;
}

export interface CardsInfoItem {
  totalCost: number,
  interceptorsLaunced: number,
  dronsesData: {
      count: number,
      totalCost: number
  },
  budgetVariance: number,
  averageInterceptCost: number
}
