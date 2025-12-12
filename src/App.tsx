import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { IdentificationScreen } from './components/IdentificationScreen';
import { DepositScreen } from './components/DepositScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ThankYouScreen } from './components/ThankYouScreen';

export type Screen = 'welcome' | 'howItWorks' | 'identification' | 'deposit' | 'summary' | 'rewards' | 'thankYou';

export interface SessionData {
  userId: string;
  containers: number;
  kilos: number;
  points: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [sessionData, setSessionData] = useState<SessionData>({
    userId: '',
    containers: 0,
    kilos: 0,
    points: 0
  });

  const resetSession = () => {
    setSessionData({
      userId: '',
      containers: 0,
      kilos: 0,
      points: 0
    });
    setCurrentScreen('welcome');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-2xl h-full bg-slate-950 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>

        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStart={() => setCurrentScreen('identification')}
            onHowItWorks={() => setCurrentScreen('howItWorks')}
          />
        )}

        {currentScreen === 'howItWorks' && (
          <HowItWorksScreen onBack={() => setCurrentScreen('welcome')} />
        )}

        {currentScreen === 'identification' && (
          <IdentificationScreen 
            onIdentified={(userId) => {
              setSessionData(prev => ({ ...prev, userId }));
              setCurrentScreen('deposit');
            }}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'deposit' && (
          <DepositScreen 
            sessionData={sessionData}
            onUpdateSession={setSessionData}
            onFinish={() => setCurrentScreen('summary')}
          />
        )}

        {currentScreen === 'summary' && (
          <SummaryScreen 
            sessionData={sessionData}
            onContinue={() => setCurrentScreen('rewards')}
            onBackToHome={resetSession}
          />
        )}

        {currentScreen === 'rewards' && (
          <RewardsScreen 
            points={sessionData.points}
            onFinish={() => setCurrentScreen('thankYou')}
            onBackToHome={resetSession}
          />
        )}

        {currentScreen === 'thankYou' && (
          <ThankYouScreen onFinish={resetSession} />
        )}
      </div>
    </div>
  );
}