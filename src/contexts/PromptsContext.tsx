'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { Prompt } from '@/types/prompt';

interface PromptsContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Omit<Prompt, 'id'>) => void;
  updatePrompt: (prompt: Prompt) => void;
  deletePrompt: (id: number) => void;
}

export const PromptsContext = createContext<PromptsContextType | undefined>(undefined);

const initialPrompts: Prompt[] = [
  { id: 1, title: 'Generate a marketing slogan for a new coffee brand.', category: 'Marketing' },
  { id: 2, title: 'Write a short story in the style of Edgar Allan Poe.', category: 'Writing' },
  { id: 3, title: 'Create a responsive navigation bar using Flexbox.', category: 'Developer Tools' },
  { id: 4, title: 'Design a logo for a tech startup named "Innovate".', category: 'Design' },
  { id: 5, title: 'Explain the concept of photosynthesis to a 5th grader.', category: 'Education' },
];

export const PromptsProvider = ({ children }: { children: ReactNode }) => {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

  const addPrompt = (prompt: Omit<Prompt, 'id'>) => {
    const newPrompt = { ...prompt, id: Date.now() };
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const updatePrompt = (updatedPrompt: Prompt) => {
    setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
  };

  const deletePrompt = (id: number) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PromptsContext.Provider value={{ prompts, addPrompt, updatePrompt, deletePrompt }}>
      {children}
    </PromptsContext.Provider>
  );
};
