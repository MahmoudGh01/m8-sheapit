import { describe, it } from 'vitest';

import { renderWithProviders } from '../../shared/test/testUtils';

import { Home } from './Home';

describe('Home - SMOKE TEST', () => {
  it('should render without crashing', () => {
    renderWithProviders(<Home />);
  });

  it('should render multiple times', () => {
    const { rerender } = renderWithProviders(<Home />);

    rerender(<Home />);
    rerender(<Home />);
  });
});
