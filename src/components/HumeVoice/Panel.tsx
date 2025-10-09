'use client';

import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

// Minimal shell; wire to Hume SDK/WebRTC later
const HumePanel = memo(({ onClose }: { onClose: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  return (
    <div
      style={{
        background: 'var(--colorBgContainer)',
        border: '1px solid var(--colorBorder)',
        borderRadius: 12,
        bottom: 160,
        color: 'var(--colorText)',
        maxWidth: 'calc(100% - 48px)',
        padding: 16,
        position: 'fixed',
        right: 24,
        width: 360,
        zIndex: 41,
      }}
    >
      <Flexbox gap={12}>
        <div style={{ fontWeight: 600 }}>Hume Voice</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Push‑to‑talk placeholder. When user speaks, AI TTS should pause; on stop, send audio to
          model.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setIsRecording((v) => !v)} type="button">
            {isRecording ? 'Stop' : 'Start'}
          </button>
          <button onClick={onClose} type="button">
            Close
          </button>
        </div>
      </Flexbox>
    </div>
  );
});

export default HumePanel;
