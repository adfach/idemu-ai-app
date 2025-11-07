'use client';

import { useContext } from 'react';
import { PromptsContext } from '@/contexts/PromptsContext';

export const usePrompts = () => {
  const context = useContext(PromptsContext);
  if (context === undefined) {
    throw new Error('usePrompts must be used within a PromptsProvider');
  }
  return context;
};
