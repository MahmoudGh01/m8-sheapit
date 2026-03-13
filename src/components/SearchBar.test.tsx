import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import { SearchBar } from './SearchBar';

describe('SearchBar - SMOKE TEST', () => {
  it('should render without crashing', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnChange} />);
  });

  it('should render with search term', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar searchTerm="matrix" onSearchChange={mockOnChange} />);
  });

  it('should render with different props', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar searchTerm="test search" onSearchChange={mockOnChange} />
    );
  });

  it('should render with empty handler', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
  });

  it('should render with long search term', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar
        searchTerm="this is a very long search term that should still work"
        onSearchChange={mockOnChange}
      />
    );
  });
});
