'use client';

import { memo } from 'react';

const VoiceFAB = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <button
      aria-label={'Open Voice'}
      onClick={onClick}
      style={{
        background: '#e11d48',
        border: 'none',
        borderRadius: 28,
        bottom: 96,
        boxShadow: '0 4px 12px rgba(0,0,0,.2)',
        color: 'white',
        height: 56,
        position: 'fixed',
        right: 24,
        width: 56,
        zIndex: 40,
      }}
      type="button"
    >
      ●
    </button>
  );
});

export default VoiceFAB;
