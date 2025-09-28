import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { UserDetails, AssessmentResults } from './types';
import { calculateAssessment } from './utils/calculations';

type AppState = 'landing' | 'assessment' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  const handleStartAssessment = () => {
    setCurrentState('assessment');
  };

  const handleFormSubmit = (details: UserDetails) => {
    setUserDetails(details);
    const results = calculateAssessment(details);
    setAssessmentResults(results);
    setCurrentState('results');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  const handleStartNew = () => {
    setUserDetails(null);
    setAssessmentResults(null);
    setCurrentState('landing');
  };

  const getHeaderProps = () => {
    if (currentState === 'assessment') {
      return { currentStep: 1, totalSteps: 3 };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header {...getHeaderProps()} />
      
      {currentState === 'landing' && (
        <LandingPage onStartAssessment={handleStartAssessment} />
      )}
      
      {currentState === 'assessment' && (
        <AssessmentForm 
          onSubmit={handleFormSubmit}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === 'results' && userDetails && assessmentResults && (
        <ResultsDashboard
          results={assessmentResults}
          userDetails={userDetails}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  );
}

export default App;