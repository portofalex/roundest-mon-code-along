import { PokemonClient } from 'pokenode-ts';
import { procedure, router } from '../trpc';
import { z } from 'zod';

export const appRouter = router({
  getPokemonById: procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
