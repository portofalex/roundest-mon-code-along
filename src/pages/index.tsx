import { Inter } from 'next/font/google';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const pokemonOne = trpc.getPokemonById.useQuery({ id: first });
  const pokemonTwo = trpc.getPokemonById.useQuery({ id: second });

  if (pokemonOne.isLoading || pokemonTwo.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <Image
            width="640"
            height="640"
            src={pokemonOne.data?.sprites.front_default ?? ''}
            alt={`Sprite of ${pokemonOne.data?.name}`}
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {pokemonOne.data?.name}
          </div>
          <button onClick={() => voteForRoundest(first)}>Rounder</button>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <Image
            width="640"
            height="640"
            src={pokemonTwo.data?.sprites.front_default ?? ''}
            alt={`Sprite of ${pokemonTwo.data?.name}`}
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {pokemonTwo.data?.name}
          </div>
          <button onClick={() => voteForRoundest(second)}>Rounder</button>
        </div>
        <div className="p-2"></div>
      </div>
    </div>
  );
}
