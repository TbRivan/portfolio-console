import React, { useEffect, useRef } from 'react';

// Raw Monospace Terminal CLI Auto-Suggestion List (Fish/Zsh Style)
export default function SuggestionPopover({ 
  suggestions, 
  selectedIndex, 
  onSelectIndex, 
  onExecuteCommand 
}) {
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: '0.4rem',
        paddingLeft: '1.6rem',
        maxHeight: '94px', // Shows 3 full rows + half of the 4th row to signal scrollability
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        lineHeight: 1.45,
        scrollbarWidth: 'none',
        transition: 'all 0.2s ease'
      }}
    >
      {suggestions.map((sug, i) => {
        const isSelected = i === selectedIndex;
        return (
          <div
            key={sug.cmd}
            ref={isSelected ? activeItemRef : null}
            onClick={(e) => {
              e.stopPropagation();
              onExecuteCommand(sug.cmd);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: isSelected ? 'var(--terminal-green)' : '#475569',
              background: isSelected ? '#131b28' : 'transparent',
              padding: '0.2rem 0.5rem',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={() => onSelectIndex(i)}
          >
            <span style={{ fontWeight: isSelected ? 700 : 400 }}>
              {isSelected ? '❯ ' : '  '}{sug.cmd}
            </span>
            <span style={{ color: isSelected ? '#94a3b8' : '#334155', fontSize: '0.72rem' }}>
              # {sug.desc}
            </span>
            {isSelected && (
              <span style={{ marginLeft: 'auto', fontSize: '0.66rem', color: 'var(--terminal-cyan)', paddingLeft: '0.5rem' }}>
                [press tab ↹ or ↵]
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
