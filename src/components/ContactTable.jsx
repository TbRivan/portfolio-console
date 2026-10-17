import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CONTACT_ITEMS = [
  { channel: 'Email', address: 'backend.engineer@kernel-dev.io', href: 'mailto:backend.engineer@kernel-dev.io', isMail: true },
  { channel: 'GitHub', address: 'github.com/backend-dev', href: 'https://github.com/backend-dev' },
  { channel: 'LinkedIn', address: 'linkedin.com/in/backend-dev', href: 'https://linkedin.com/in/backend-dev' },
  { channel: 'Twitter', address: 'x.com/backend_dev', href: 'https://x.com/backend_dev' },
];

export default function ContactTable() {
  const [copiedChannel, setCopiedChannel] = useState(null);

  const handleRowClick = (item) => {
    if (item.isMail) {
      navigator.clipboard.writeText(item.address);
      setCopiedChannel(item.channel);
      setTimeout(() => setCopiedChannel(null), 1800);
      window.location.href = item.href;
    } else {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ margin: '0.4rem 0', fontFamily: 'var(--font-mono)' }}
    >
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, delay: 0.05 }}
        style={{ color: 'var(--text-muted)', marginBottom: '0.6rem', fontSize: '0.85rem' }}
      >
        [+] Direct Communication Channels & Social Profiles (Click line to open):
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxWidth: '540px' }}>
        {CONTACT_ITEMS.map((item, idx) => {
          const isCopied = copiedChannel === item.channel;

          return (
            <motion.div
              key={item.channel}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.24,
                delay: 0.08 + idx * 0.06,
                ease: "easeOut"
              }}
              onClick={() => handleRowClick(item)}
              className="contact-line-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.8rem',
                borderRadius: '4px',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.18s ease-in-out',
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                <span className="contact-prefix" style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>&gt;</span>
                <span style={{ color: 'var(--terminal-cyan)', fontWeight: 600, minWidth: '85px', fontSize: '0.88rem' }}>
                  {item.channel}
                </span>
                <span className="contact-address" style={{ color: isCopied ? 'var(--terminal-green)' : 'var(--text-main)', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {isCopied ? '✓ Address Copied to Clipboard!' : item.address}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
