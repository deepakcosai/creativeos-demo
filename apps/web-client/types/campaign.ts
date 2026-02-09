export interface Campaign {
  id?: string;
  name: string;
  objective: 'awareness' | 'engagement' | 'conversion' | 'leads';
  clientDnaId: string;
  platforms: string[];
  contentPillars: string[];
  dateRange: {
    start: string;
    end: string;
  };
  kpis?: any;
  budget?: any;
  status?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  clientDna?: any;
}