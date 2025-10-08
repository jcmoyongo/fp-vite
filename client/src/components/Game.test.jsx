import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameComponent from './Game';
import { GameContext } from '../context/GameContext';

const MockProvider = ({ children, series = [] }) => {
  const ctx = {
    series,
    loading: false
  };
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>;
};

describe('GameComponent', () => {
  it('shows placeholder image when series is empty', () => {
    render(
      <MockProvider series={[]}>
        <GameComponent />
      </MockProvider>
    );

    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
  });
});
