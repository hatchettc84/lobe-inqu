'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AGUIWelcome from '@/components/AGUI/Welcome';

const AGUIPage = memo(() => {
  return (
    <Flexbox gap={16} padding={16} style={{ width: '100%' }}>
      <AGUIWelcome />
    </Flexbox>
  );
});

export default AGUIPage;
