export type IPOStatus = 'live' | 'upcoming' | 'listed';

export type IPO = {
  id: string;
  companyName: string;
  symbol: string;
  logo: string;
  priceRange: string;
  lotSize: number;
  issueSize: string;
  openDate: string;
  closeDate: string;
  listingDate: string;
  status: IPOStatus;
  subscriptionRate?: number;
  listingGain?: number;
  sector: string;
  description: string;
  financialHighlights: {
    revenue: string;
    profit: string;
    debtToEquity: string;
    roe: string;
  };
  leadManagers: string[];
  registrar: string;
};

export type IPOCategory = 'mainline' | 'sme';

export type QuickStat = {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: string;
};