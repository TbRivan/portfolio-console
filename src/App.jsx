import React, { useState } from 'react';
import RpsGame from './components/RpsGame';
import Terminal from './components/Terminal';
import ScreenTransitionLoader from './components/ScreenTransitionLoader';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0a0c10',
          color: '#ef4444',
          fontFamily: 'var(--font-mono, monospace)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#f87171' }}>
            [KERNEL PANIC] UI Render Exception Caught
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '500px', marginBottom: '1.5rem' }}>
            {this.state.error?.message || "An unexpected error occurred in the terminal session."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid var(--terminal-cyan, #06b6d4)',
              color: 'var(--terminal-cyan, #06b6d4)',
              padding: '0.5rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700
            }}
          >
            Reboot Session
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [screen, setScreen] = useState('terminal'); // 'terminal' | 'game'
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
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0c10' }}>
        <ScreenTransitionLoader 
          isTransitioning={isTransitioning} 
          targetScreen={targetScreen} 
        />

        {screen === 'terminal' ? (
          <Terminal onReturnToGame={() => handleNavigate('game')} />
        ) : (
          <RpsGame onStartPortfolio={() => handleNavigate('terminal')} />
        )}
      </div>
    </ErrorBoundary>
  );
}
