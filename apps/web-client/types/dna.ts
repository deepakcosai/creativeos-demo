export interface ClientDNA {
  id?: string;
  clientName: string;
  industry: string;
  brandTone: string;
  targetAudience: {
    ageRange: string;
    gender: string;
    interests: string[];
    painPoints: string[];
  };
  geography: {
    country: string;
    state?: string;
    city?: string;
    urbanRural: 'urban' | 'rural' | 'semi-urban';
  };
  psychographics: {
    values: string[];
    lifestyle: string;
    buyingBehavior: string;
  };
  products?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
  competitors?: string[];
  version?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}