import React from 'react';
import { AssessmentResults, UserDetails } from '../types';
import { 
  Droplets, 
  TrendingUp, 
  Calculator, 
  MapPin, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  IndianRupee,
  Calendar
} from 'lucide-react';

interface ResultsDashboardProps {
  results: AssessmentResults;
  userDetails: UserDetails;
  onStartNew: () => void;
}

export function ResultsDashboard({ results, userDetails, onStartNew }: ResultsDashboardProps) {
  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFeasibilityIcon = (feasibility: string) => {
    switch (feasibility) {
      case 'High': return <CheckCircle className="h-5 w-5" />;
      case 'Medium': return <AlertTriangle className="h-5 w-5" />;
      case 'Low': return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const downloadReport = () => {
    // In a real application, this would generate and download a PDF
    alert('PDF report generation would be implemented here. This would include all assessment details, recommendations, and technical specifications.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Results for {userDetails.name}
          </h2>
          <p className="text-gray-600">{userDetails.location}, {userDetails.state}</p>
        </div>

        {/* Feasibility Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getFeasibilityColor(results.feasibility)} mb-4`}>
              {getFeasibilityIcon(results.feasibility)}
              <span className="font-semibold">{results.feasibility} Feasibility</span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{results.feasibilityScore}%</div>
            <p className="text-gray-600">Rainwater Harvesting Potential</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="h-8 w-8 text-blue-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(results.harvestablePotential)}</div>
                <div className="text-sm text-gray-600">Liters/Year</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Annual Harvest Potential</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{results.annualRainfall}</div>
                <div className="text-sm text-gray-600">mm/year</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Average Annual Rainfall</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="h-8 w-8 text-green-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.costAnalysis.annualSavings)}</div>
                <div className="text-sm text-gray-600">Annual Savings</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Estimated Cost Reduction</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{results.costAnalysis.paybackPeriod}</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Payback Period</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recommended Structures */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Recommended Structures
            </h3>
            <div className="space-y-4">
              {results.recommendedStructures.map((structure, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{structure.type}</h4>
                    <span className="text-green-600 font-semibold">{formatCurrency(structure.cost)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div className="grid grid-cols-2 gap-2">
                      {structure.dimensions.length && (
                        <div>Length: {structure.dimensions.length}m</div>
                      )}
                      {structure.dimensions.width && (
                        <div>Width: {structure.dimensions.width}m</div>
                      )}
                      {structure.dimensions.diameter && (
                        <div>Diameter: {structure.dimensions.diameter}m</div>
                      )}
                      <div>Depth: {structure.dimensions.depth}m</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">
                    Capacity: {formatNumber(structure.capacity)} liters
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {structure.suitability}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aquifer Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-green-600" />
              Aquifer Information
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Aquifer Type</div>
                <div className="font-semibold text-gray-900">{results.aquiferInfo.type}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Depth to Groundwater</div>
                <div className="font-semibold text-gray-900">{results.aquiferInfo.depth} meters</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Water Quality</div>
                <div className="font-semibold text-gray-900">{results.aquiferInfo.quality}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Expected Yield</div>
                <div className="font-semibold text-gray-900">{results.aquiferInfo.yield}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {formatCurrency(results.costAnalysis.initialCost)}
              </div>
              <div className="text-sm text-gray-600">Initial Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {formatCurrency(results.costAnalysis.maintenanceCost)}
              </div>
              <div className="text-sm text-gray-600">Annual Maintenance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatCurrency(results.costAnalysis.annualSavings)}
              </div>
              <div className="text-sm text-gray-600">Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formatCurrency(results.costAnalysis.totalBenefit)}
              </div>
              <div className="text-sm text-gray-600">20-Year Net Benefit</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadReport}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Detailed Report</span>
          </button>
          <button
            onClick={onStartNew}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Start New Assessment
          </button>
        </div>

        {/* Implementation Guidelines */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Implementation Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Next Steps</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Consult with local authorities for approvals</li>
                <li>• Hire certified contractors for installation</li>
                <li>• Ensure proper filtration systems</li>
                <li>• Plan for regular maintenance schedule</li>
                <li>• Monitor water quality periodically</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Reduced dependency on external water sources</li>
                <li>• Lower water bills and long-term savings</li>
                <li>• Improved groundwater levels in your area</li>
                <li>• Environmental conservation contribution</li>
                <li>• Increased property value</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}