import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { Layout } from './Layout';

describe('Layout - SMOKE TEST', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  it('should render multiple times', () => {
    const { rerender } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });
});
