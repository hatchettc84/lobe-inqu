'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

// Placeholder wrapper for AG-UI until the real component/package is wired
// Replace the <div> below with your actual AG-UI component import & props
const AGUIWelcome = memo(() => {
  return (
    <Flexbox gap={12} style={{ width: '100%' }}>
      <div
        style={{
          border: '1px solid var(--colorBorder)',
          borderRadius: 12,
          padding: 16,
        }}
      >
        AG-UI placeholder: embed your AG-UI widget here.
      </div>
    </Flexbox>
  );
});

export default AGUIWelcome;
