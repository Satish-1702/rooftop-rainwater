import React from 'react';
import { Droplets, Leaf } from 'lucide-react';

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

export function Header({ currentStep, totalSteps }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8" />
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">RTRWH Assessment Portal</h1>
              <p className="text-blue-100 text-sm">Rooftop Rainwater Harvesting & Artificial Recharge</p>
            </div>
          </div>
          
          {currentStep && totalSteps && (
            <div className="text-right">
              <div className="text-sm text-blue-100">Assessment Progress</div>
              <div className="text-lg font-semibold">Step {currentStep} of {totalSteps}</div>
              <div className="w-24 bg-blue-700 rounded-full h-2 mt-1">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}