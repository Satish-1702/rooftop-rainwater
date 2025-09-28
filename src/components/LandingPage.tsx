import React from 'react';
import { ChevronRight, MapPin, Calculator, BarChart3, Download, Globe, Shield } from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
}

export function LandingPage({ onStartAssessment }: LandingPageProps) {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location-Based Analysis',
      description: 'Get precise recommendations based on your location\'s rainfall patterns and geology'
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: 'Technical Specifications',
      description: 'Detailed dimensions and specifications for recharge structures suitable for your property'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Cost-Benefit Analysis',
      description: 'Complete financial analysis with ROI calculations and payback periods'
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'Downloadable Reports',
      description: 'Generate comprehensive PDF reports for implementation and approval processes'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Multi-Language Support',
      description: 'Available in regional languages for better accessibility and understanding'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Scientific Methodology',
      description: 'Based on CGWB guidelines and proven hydrological calculation methods'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Assess Your Rainwater
            <span className="text-blue-600"> Harvesting Potential</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how much rainwater you can harvest from your rooftop and get personalized recommendations 
            for artificial recharge structures. Make informed decisions for sustainable water management.
          </p>
          <button
            onClick={onStartAssessment}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Start Assessment</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
            <div className="text-gray-600">Liters Annual Potential</div>
            <div className="text-sm text-gray-500 mt-1">Average rooftop harvest</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
            <div className="text-gray-600">Water Cost Reduction</div>
            <div className="text-sm text-gray-500 mt-1">With proper implementation</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3-5 Years</div>
            <div className="text-gray-600">Payback Period</div>
            <div className="text-sm text-gray-500 mt-1">Average return on investment</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Comprehensive Assessment Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Enter Details</h4>
              <p className="text-gray-600 text-sm">Provide basic information about your location and property</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Analysis</h4>
              <p className="text-gray-600 text-sm">Our system analyzes rainfall, soil, and geological data</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
              <p className="text-gray-600 text-sm">Get personalized structure recommendations and specifications</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
              <p className="text-gray-600 text-sm">Download detailed reports and start your project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}