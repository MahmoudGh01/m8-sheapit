import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('App - SMOKE TEST', () => {
  it('should render without crashing', () => {
    render(<App />);
  });

  it('should render multiple times', () => {
    const { rerender } = render(<App />);
    rerender(<App />);
    rerender(<App />);
  });
});
