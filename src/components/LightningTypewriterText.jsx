import React, { useState, useEffect } from 'react';

// Fluid, Ultra-Smooth Monospace Typewriter Text Component
export default function LightningTypewriterText({ 
  text, 
  chunkSize = 1, 
  intervalMs = 10, 
  startDelayMs = 120, 
  onComplete, 
  onTick,
  isPre = false,
  className = '',
  style = {}
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingStarted, setIsTypingStarted] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTypingStarted(false);

    // Adaptive typing speed scaling for long text responses
    const len = text.length;
    const activeChunkSize = len > 600 ? 8 : len > 300 ? 4 : len > 150 ? 2 : chunkSize;
    const activeIntervalMs = len > 600 ? 3 : len > 300 ? 5 : len > 150 ? 8 : intervalMs;

    let frameId;
    const delayTimeout = setTimeout(() => {
      setIsTypingStarted(true);
      let currentIndex = 0;
      let lastTime = performance.now();

      const typeStep = (now) => {
        if (now - lastTime >= activeIntervalMs) {
          lastTime = now;
          if (currentIndex < text.length) {
            currentIndex += activeChunkSize;
            setDisplayedText(text.substring(0, currentIndex));
            if (onTick) onTick();
          }
        }

        if (currentIndex < text.length) {
          frameId = requestAnimationFrame(typeStep);
        } else {
          setDisplayedText(text);
          if (onTick) onTick();
          if (onComplete) onComplete();
        }
      };

      frameId = requestAnimationFrame(typeStep);
    }, startDelayMs);

    return () => {
      clearTimeout(delayTimeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, chunkSize, intervalMs, startDelayMs]);

  return (
    <span 
      className={className}
      style={{ 
        whiteSpace: isPre ? 'pre' : 'pre-wrap', 
        wordBreak: isPre ? 'normal' : 'break-word',
        display: isPre ? 'inline-block' : 'inline',
        ...style 
      }}
    >
      {displayedText}
      {(displayedText.length < text.length || !isTypingStarted) && (
        <span className="term-cursor" />
      )}
    </span>
  );
}
