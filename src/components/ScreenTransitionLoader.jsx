import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScreenTransitionLoader({ isTransitioning, targetScreen }) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#0a0c10',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            color: '#e2e8f0',
            fontFamily: 'var(--font-mono)',
            userSelect: 'none'
          }}
        >
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: 600,
            color: targetScreen === 'terminal' ? 'var(--terminal-green)' : 'var(--terminal-cyan)'
          }}>
            {targetScreen === 'terminal' 
              ? '[+] Returning to Terminal Shell...' 
              : '[+] Context Switching to Game Arena...'}
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Handshaking session environment...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
