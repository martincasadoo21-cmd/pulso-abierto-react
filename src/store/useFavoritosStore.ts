
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CriptoId } from '../types/criptomoneda';

interface FavoritosState {
  favoritos: CriptoId[];
  alternarFavorito: (id: CriptoId) => void;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist<
    FavoritosState,
    [],
    [],
    Pick<FavoritosState, 'favoritos'>
  >(
    (set) => ({
      favoritos: [],

      alternarFavorito: (id) =>
        set((estado) => ({
          favoritos: estado.favoritos.includes(id)
            ? estado.favoritos.filter((valor) => valor !== id)
            : [...estado.favoritos, id],
        })),
    }),
    {
      name: 'pulso-abierto-favoritos',
      storage: createJSONStorage(() => localStorage),
      partialize: (estado) => ({
        favoritos: estado.favoritos,
      }),
    }
  )
);