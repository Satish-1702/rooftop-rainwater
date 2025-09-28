export interface UserDetails {
  name: string;
  location: string;
  state: string;
  dwellers: number;
  roofArea: number;
  openSpace: number;
  roofType: string;
  soilType: string;
  currentWaterSource: string;
}

export interface AssessmentResults {
  feasibility: 'High' | 'Medium' | 'Low';
  feasibilityScore: number;
  annualRainfall: number;
  runoffCoefficient: number;
  harvestablePotential: number;
  recommendedStructures: RechargeStructure[];
  aquiferInfo: AquiferInfo;
  costAnalysis: CostAnalysis;
  waterRequirement: number;
  roiPeriod: number;
}

export interface RechargeStructure {
  type: string;
  dimensions: {
    length?: number;
    width?: number;
    depth: number;
    diameter?: number;
  };
  capacity: number;
  cost: number;
  suitability: string;
}

export interface AquiferInfo {
  type: string;
  depth: number;
  quality: string;
  yield: string;
}

export interface CostAnalysis {
  initialCost: number;
  maintenanceCost: number;
  annualSavings: number;
  paybackPeriod: number;
  totalBenefit: number;
}