import { UserDetails, AssessmentResults, RechargeStructure, AquiferInfo, CostAnalysis } from '../types';

// Rainfall data for different states (mm/year)
const RAINFALL_DATA: { [key: string]: number } = {
  'Kerala': 2000,
  'Karnataka': 1200,
  'Tamil Nadu': 950,
  'Andhra Pradesh': 940,
  'Maharashtra': 1200,
  'Gujarat': 800,
  'Rajasthan': 400,
  'Delhi': 650,
  'West Bengal': 1600,
  'Odisha': 1500,
  'Uttar Pradesh': 800,
  'Bihar': 1200,
  'Jharkhand': 1400,
  'Madhya Pradesh': 1100,
  'Chhattisgarh': 1300,
  'Telangana': 940,
  'Haryana': 560,
  'Punjab': 650,
  'Himachal Pradesh': 1200,
  'Uttarakhand': 1600,
  'Jammu and Kashmir': 1000,
  'Assam': 2300,
  'Meghalaya': 2500,
  'Manipur': 1400,
  'Tripura': 2000,
  'Mizoram': 2500,
  'Nagaland': 2000,
  'Arunachal Pradesh': 2800,
  'Sikkim': 3200,
  'Goa': 3000
};

// Runoff coefficients for different roof types
const RUNOFF_COEFFICIENTS: { [key: string]: number } = {
  'Concrete/RCC': 0.85,
  'Tile': 0.75,
  'Metal Sheet': 0.90,
  'Thatched': 0.40
};

// Soil percolation rates (mm/hr)
const SOIL_PERCOLATION: { [key: string]: number } = {
  'Sandy': 50,
  'Loamy': 20,
  'Clay': 5,
  'Rocky': 10
};

export function calculateAssessment(userDetails: UserDetails): AssessmentResults {
  const rainfall = RAINFALL_DATA[userDetails.state] || 800;
  const runoffCoefficient = RUNOFF_COEFFICIENTS[userDetails.roofType] || 0.75;
  
  // Calculate harvestable potential (liters/year)
  const harvestablePotential = (userDetails.roofArea * rainfall * runoffCoefficient * 0.8); // 0.8 for losses
  
  // Calculate water requirement (liters/day)
  const waterRequirement = userDetails.dwellers * 150; // 150 liters per person per day
  const annualWaterRequirement = waterRequirement * 365;
  
  // Calculate feasibility score
  const feasibilityScore = Math.min(100, (harvestablePotential / annualWaterRequirement) * 100);
  
  let feasibility: 'High' | 'Medium' | 'Low';
  if (feasibilityScore >= 70) feasibility = 'High';
  else if (feasibilityScore >= 40) feasibility = 'Medium';
  else feasibility = 'Low';
  
  // Generate recommended structures
  const recommendedStructures = generateRechargeStructures(userDetails, harvestablePotential);
  
  // Generate aquifer info (simulated based on location)
  const aquiferInfo = generateAquiferInfo(userDetails.state);
  
  // Calculate cost analysis
  const costAnalysis = calculateCostAnalysis(recommendedStructures, harvestablePotential, waterRequirement);
  
  return {
    feasibility,
    feasibilityScore: Math.round(feasibilityScore),
    annualRainfall: rainfall,
    runoffCoefficient,
    harvestablePotential: Math.round(harvestablePotential),
    recommendedStructures,
    aquiferInfo,
    costAnalysis,
    waterRequirement,
    roiPeriod: costAnalysis.paybackPeriod
  };
}

function generateRechargeStructures(userDetails: UserDetails, harvestablePotential: number): RechargeStructure[] {
  const structures: RechargeStructure[] = [];
  
  // Recharge pit
  if (userDetails.openSpace >= 25) {
    structures.push({
      type: 'Recharge Pit',
      dimensions: {
        length: 3,
        width: 2,
        depth: 3
      },
      capacity: 18000, // liters
      cost: 15000,
      suitability: userDetails.openSpace >= 25 ? 'Highly Suitable' : 'Not Suitable'
    });
  }
  
  // Percolation tank
  if (userDetails.openSpace >= 100) {
    structures.push({
      type: 'Percolation Tank',
      dimensions: {
        length: 10,
        width: 8,
        depth: 2.5
      },
      capacity: 200000, // liters
      cost: 80000,
      suitability: 'Suitable for large harvesting potential'
    });
  }
  
  // Recharge well
  structures.push({
    type: 'Recharge Well',
    dimensions: {
      diameter: 2,
      depth: 10
    },
    capacity: 31400, // liters
    cost: 25000,
    suitability: 'Suitable for moderate spaces'
  });
  
  // Filter tank (always recommended)
  structures.push({
    type: 'Filter Tank',
    dimensions: {
      length: 2,
      width: 1.5,
      depth: 1.5
    },
    capacity: 4500, // liters
    cost: 8000,
    suitability: 'Essential for water quality'
  });
  
  return structures;
}

function generateAquiferInfo(state: string): AquiferInfo {
  // Simulated aquifer data based on geological knowledge
  const aquiferData: { [key: string]: AquiferInfo } = {
    'Kerala': { type: 'Laterite/Sedimentary', depth: 15, quality: 'Good', yield: 'Moderate' },
    'Karnataka': { type: 'Hard Rock', depth: 25, quality: 'Good', yield: 'Low to Moderate' },
    'Tamil Nadu': { type: 'Hard Rock/Sedimentary', depth: 30, quality: 'Fair', yield: 'Low' },
    'Maharashtra': { type: 'Basaltic', depth: 20, quality: 'Good', yield: 'Moderate' },
    'Gujarat': { type: 'Alluvial/Hard Rock', depth: 40, quality: 'Fair', yield: 'High' },
    'Rajasthan': { type: 'Sandstone/Alluvial', depth: 60, quality: 'Fair', yield: 'Low' },
    'Delhi': { type: 'Alluvial', depth: 12, quality: 'Poor', yield: 'High' }
  };
  
  return aquiferData[state] || { type: 'Mixed', depth: 25, quality: 'Good', yield: 'Moderate' };
}

function calculateCostAnalysis(structures: RechargeStructure[], harvestablePotential: number, dailyWaterNeed: number): CostAnalysis {
  const initialCost = structures.reduce((sum, structure) => sum + structure.cost, 0);
  const maintenanceCost = initialCost * 0.05; // 5% annual maintenance
  
  // Calculate savings based on water cost (₹2 per liter for tanker water in water-scarce areas)
  const currentWaterCost = dailyWaterNeed * 365 * 0.5; // ₹0.5 per liter average
  const annualSavings = Math.min(harvestablePotential * 0.3, currentWaterCost); // 30% cost reduction
  
  const paybackPeriod = initialCost / (annualSavings - maintenanceCost);
  const totalBenefit = (annualSavings * 20) - (initialCost + (maintenanceCost * 20)); // 20-year analysis
  
  return {
    initialCost,
    maintenanceCost,
    annualSavings,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    totalBenefit
  };
}