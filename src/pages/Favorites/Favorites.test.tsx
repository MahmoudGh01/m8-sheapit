import { describe, it } from 'vitest';

import { renderWithProviders } from '../../shared/test/testUtils';

import { Favorites } from './Favorites';

describe('Favorites - SMOKE TEST', () => {
  it('should render without crashing', () => {
    renderWithProviders(<Favorites />);
  });

  it('should render multiple times', () => {
    const { rerender } = renderWithProviders(<Favorites />);

    rerender(<Favorites />);
    rerender(<Favorites />);
  });
});
