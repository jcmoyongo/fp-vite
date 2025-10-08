import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SelectComponent from './Select';
import { GameContext } from '../context/GameContext';

const MockProvider = ({ children }) => {
  const ctx = {
    scheduleList: [{ value: '2025-10-01', label: '01/10/2025' }],
    handleChange: () => {}
  };
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>;
};

describe('SelectComponent', () => {
  it('renders placeholder and select', () => {
    render(
      <MockProvider>
        <SelectComponent />
      </MockProvider>
    );

    expect(screen.getByText(/Choisir une date/)).toBeTruthy();
  });
});
