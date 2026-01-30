/**
 * CartIcon Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartIcon } from './CartIcon';
import { CartProvider } from '../../context/CartContext';

// Mock useCart hook for specific test scenarios
vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: vi.fn(() => ({
      itemCount: 0,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    })),
  };
});

describe('CartIcon', () => {
  it('renders shopping cart icon', () => {
    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /shopping cart/i });
    expect(button).toBeInTheDocument();
  });

  it('displays badge when itemCount > 0', async () => {
    const { useCart } = await import('../../context/CartContext');
    vi.mocked(useCart).mockReturnValue({
      itemCount: 3,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides badge when itemCount = 0', async () => {
    const { useCart } = await import('../../context/CartContext');
    vi.mocked(useCart).mockReturnValue({
      itemCount: 0,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it('shows "99+" when itemCount > 99', async () => {
    const { useCart } = await import('../../context/CartContext');
    vi.mocked(useCart).mockReturnValue({
      itemCount: 150,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartIcon onClick={handleClick} />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /shopping cart/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has proper ARIA label with item count', async () => {
    const { useCart } = await import('../../context/CartContext');
    vi.mocked(useCart).mockReturnValue({
      itemCount: 5,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    expect(screen.getByRole('button', { name: 'Shopping cart with 5 items' })).toBeInTheDocument();
  });

  it('uses singular "item" when count is 1', async () => {
    const { useCart } = await import('../../context/CartContext');
    vi.mocked(useCart).mockReturnValue({
      itemCount: 1,
      items: [],
      total: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateItemQuantity: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    expect(screen.getByRole('button', { name: 'Shopping cart with 1 item' })).toBeInTheDocument();
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartIcon onClick={handleClick} />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /shopping cart/i });
    button.focus();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <CartProvider>
        <CartIcon className="custom-class" />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /shopping cart/i });
    expect(button).toHaveClass('custom-class');
  });
});
