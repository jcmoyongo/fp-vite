import React, { useContext } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameContextProvider, GameContext } from './GameContext';

// Network requests are mocked with MSW (src/mocks)

const Consumer = () => {
  const ctx = useContext(GameContext);
  return (
    <div>
      <span data-testid="has-scheduleList">{Array.isArray(ctx.scheduleList) ? 'yes' : 'no'}</span>
      <span data-testid="has-handleChange">{typeof ctx.handleChange === 'function' ? 'yes' : 'no'}</span>
    </div>
  );
};

describe('GameContext basic', () => {
  it('provides scheduleList and handleChange', async () => {
    render(
      <GameContextProvider>
        <Consumer />
      </GameContextProvider>
    );

    expect(screen.getByTestId('has-scheduleList').textContent).toBe('yes');
    expect(screen.getByTestId('has-handleChange').textContent).toBe('yes');
  });
});
