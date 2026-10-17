import React, { useState } from 'react';
import RpsGame from './components/RpsGame';
import Terminal from './components/Terminal';
import ScreenTransitionLoader from './components/ScreenTransitionLoader';

export default function App() {
  const [screen, setScreen] = useState('game'); // 'game' | 'terminal'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetScreen, setTargetScreen] = useState(null);

  const handleNavigate = (nextScreen) => {
    if (isTransitioning || nextScreen === screen) return;
    setTargetScreen(nextScreen);
    setIsTransitioning(true);

    // Switch screen behind the black loading curtain when fully covered
    setTimeout(() => {
      setScreen(nextScreen);
    }, 320);

    // Fade out loading curtain smoothly
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0c10' }}>
      <ScreenTransitionLoader 
        isTransitioning={isTransitioning} 
        targetScreen={targetScreen} 
      />

      {screen === 'game' ? (
        <RpsGame onStartPortfolio={() => handleNavigate('terminal')} />
      ) : (
        <Terminal onReturnToGame={() => handleNavigate('game')} />
      )}
    </div>
  );
}
