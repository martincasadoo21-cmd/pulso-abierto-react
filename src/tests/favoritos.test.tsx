import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BotonFavorito from '../components/BotonFavorito';
import { useFavoritosStore } from '../store/useFavoritosStore';

describe('Favoritos de criptomonedas', () => {
  beforeEach(() => {
    useFavoritosStore.setState({ favoritos: [] });
  });

  it('permite agregar y quitar Bitcoin de favoritos', async () => {
    const usuario = userEvent.setup();

    render(<BotonFavorito id="bitcoin" />);

    const agregar = screen.getByRole('button', {
      name: 'Agregar Bitcoin a favoritos',
    });

    expect(agregar).toHaveAttribute('aria-pressed', 'false');

    await usuario.click(agregar);

    const quitar = screen.getByRole('button', {
      name: 'Quitar Bitcoin de favoritos',
    });

    expect(quitar).toHaveAttribute('aria-pressed', 'true');

    await usuario.click(quitar);

    expect(
      screen.getByRole('button', {
        name: 'Agregar Bitcoin a favoritos',
      })
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('comparte la selección entre dos botones', async () => {
    const usuario = userEvent.setup();

    render(
      <>
        <BotonFavorito id="bitcoin" />
        <BotonFavorito id="bitcoin" />
      </>
    );

    const botones = screen.getAllByRole('button', {
      name: 'Agregar Bitcoin a favoritos',
    });

    await usuario.click(botones[0]);

    expect(
      screen.getAllByRole('button', {
        name: 'Quitar Bitcoin de favoritos',
      })
    ).toHaveLength(2);
  });
});
