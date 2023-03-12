import { Inter } from 'next/font/google';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

const buttonStyle = 'inline-flex py-2 px-4 bg-stone-700 rounded';

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const pokemonOne = trpc.getPokemonById.useQuery({ id: first });
  const pokemonTwo = trpc.getPokemonById.useQuery({ id: second });

  const voteMutation = trpc.castVote.useMutation();

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center w-[800px] h-[400px]">
        <div className="w-1/2 flex flex-col items-center gap-2 mb-8">
          <Image
            width="640"
            height="640"
            src={pokemonOne.data?.sprites.front_default ?? ''}
            alt={`Sprite of ${pokemonOne.data?.name}`}
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {pokemonOne.data?.name}
          </div>
          <button
            className={buttonStyle}
            onClick={() => voteForRoundest(first)}
          >
            Rounder
          </button>
        </div>
        <div className="text-4xl font-bold p-8">Vs</div>
        <div className="w-1/2 flex flex-col items-center gap-2 mb-8">
          <Image
            width="640"
            height="640"
            src={pokemonTwo.data?.sprites.front_default ?? ''}
            alt={`Sprite of ${pokemonTwo.data?.name}`}
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {pokemonTwo.data?.name}
          </div>
          <button
            className={buttonStyle}
            onClick={() => voteForRoundest(second)}
          >
            Rounder
          </button>
        </div>
        <div className="p-2"></div>
      </div>
    </div>
  );
}
