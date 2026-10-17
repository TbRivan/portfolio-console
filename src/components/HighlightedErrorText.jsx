import React, { useState, useEffect } from 'react';

// Component to render text with highlighted red error lines
export default function HighlightedErrorText({ text, chunkSize = 120, intervalMs = 1, onComplete, onTick }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        i += chunkSize;
        setDisplayedText(text.substring(0, i));
        if (onTick) onTick();
      } else {
        setDisplayedText(text);
        clearInterval(timer);
        if (onTick) onTick();
        if (onComplete) onComplete();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [text, chunkSize, intervalMs]);

  const lines = displayedText.split('\n');

  return (
    <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {lines.map((line, lIdx) => {
        const isErrorLine = line.includes('ERROR') || line.includes('FATAL') || line.includes('panic') || line.includes('CRITICAL') || line.includes('TERMINATED') || line.includes('DEADLOCK') || line.includes('FAULT');
        return (
          <React.Fragment key={lIdx}>
            <span style={{ color: isErrorLine ? '#ef4444' : 'inherit', fontWeight: isErrorLine ? 700 : 400 }}>
              {line}
            </span>
            {lIdx < lines.length - 1 && '\n'}
          </React.Fragment>
        );
      })}
      {displayedText.length < text.length && <span className="term-cursor" />}
    </span>
  );
}
