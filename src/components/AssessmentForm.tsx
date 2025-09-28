import React, { useState } from 'react';
import { UserDetails } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface AssessmentFormProps {
  onSubmit: (details: UserDetails) => void;
  onBack: () => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const ROOF_TYPES = ['Concrete/RCC', 'Tile', 'Metal Sheet', 'Thatched'];
const SOIL_TYPES = ['Sandy', 'Loamy', 'Clay', 'Rocky'];
const WATER_SOURCES = ['Municipal Supply', 'Borewell', 'Tanker', 'Well', 'Other'];

export function AssessmentForm({ onSubmit, onBack }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    location: '',
    state: '',
    dwellers: 4,
    roofArea: 0,
    openSpace: 0,
    roofType: '',
    soilType: '',
    currentWaterSource: ''
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const handleInputChange = (field: keyof UserDetails, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<UserDetails> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.state) newErrors.state = 'State is required';
        break;
      case 2:
        if (formData.dwellers <= 0) newErrors.dwellers = 'Number of dwellers must be positive';
        if (formData.roofArea <= 0) newErrors.roofArea = 'Roof area must be positive';
        if (formData.openSpace < 0) newErrors.openSpace = 'Open space cannot be negative';
        break;
      case 3:
        if (!formData.roofType) newErrors.roofType = 'Roof type is required';
        if (!formData.soilType) newErrors.soilType = 'Soil type is required';
        if (!formData.currentWaterSource) newErrors.currentWaterSource = 'Water source is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location/City *</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your city or location"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
        <select
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.state ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your state</option>
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
        <input
          type="number"
          value={formData.dwellers}
          onChange={(e) => handleInputChange('dwellers', parseInt(e.target.value) || 0)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.dwellers ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Number of people in your household"
          min="1"
        />
        {errors.dwellers && <p className="text-red-500 text-sm mt-1">{errors.dwellers}</p>}
        <p className="text-gray-500 text-sm mt-1">Used to calculate daily water requirement</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Roof Area (sq. meters) *</label>
        <input
          type="number"
          value={formData.roofArea || ''}
          onChange={(e) => handleInputChange('roofArea', parseFloat(e.target.value) || 0)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.roofArea ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Total roof area in square meters"
          min="0"
          step="0.1"
        />
        {errors.roofArea && <p className="text-red-500 text-sm mt-1">{errors.roofArea}</p>}
        <p className="text-gray-500 text-sm mt-1">Measure length × width of your roof</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Open Space (sq. meters)</label>
        <input
          type="number"
          value={formData.openSpace || ''}
          onChange={(e) => handleInputChange('openSpace', parseFloat(e.target.value) || 0)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.openSpace ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Available space for recharge structures"
          min="0"
          step="0.1"
        />
        {errors.openSpace && <p className="text-red-500 text-sm mt-1">{errors.openSpace}</p>}
        <p className="text-gray-500 text-sm mt-1">Space available for installing recharge pits or tanks</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Roof Type *</label>
        <select
          value={formData.roofType}
          onChange={(e) => handleInputChange('roofType', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.roofType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select roof type</option>
          {ROOF_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.roofType && <p className="text-red-500 text-sm mt-1">{errors.roofType}</p>}
        <p className="text-gray-500 text-sm mt-1">Roof material affects water collection efficiency</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type *</label>
        <select
          value={formData.soilType}
          onChange={(e) => handleInputChange('soilType', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.soilType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select soil type</option>
          {SOIL_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.soilType && <p className="text-red-500 text-sm mt-1">{errors.soilType}</p>}
        <p className="text-gray-500 text-sm mt-1">Determines groundwater recharge rate</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Water Source *</label>
        <select
          value={formData.currentWaterSource}
          onChange={(e) => handleInputChange('currentWaterSource', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.currentWaterSource ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select water source</option>
          {WATER_SOURCES.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
        {errors.currentWaterSource && <p className="text-red-500 text-sm mt-1">{errors.currentWaterSource}</p>}
        <p className="text-gray-500 text-sm mt-1">Your primary source of water supply</p>
      </div>
    </div>
  );

  const stepTitles = [
    'Personal & Location Details',
    'Property Specifications',
    'Technical Parameters'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepTitles[currentStep - 1]}</h2>
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${
                      step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-4">
                Step {currentStep} of 3 - Please provide accurate information for better assessment results.
              </p>
            </div>

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{currentStep === 1 ? 'Back to Home' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>{currentStep === 3 ? 'Generate Assessment' : 'Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}