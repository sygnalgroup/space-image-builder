import React from 'react';
import { Navbar } from '~/components/Navbar';
import { ButtonNewTournament } from '~/components/Tournament/ButtonNewTournament';
import List from '~/components/Tournament/List';

export const Tournaments = () => {
  return (
    <div>
      <Navbar
        left={
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">Torneios</span>
          </div>
        }
        right={
          <div>
            <ButtonNewTournament />
          </div>
        }
      />

      <div className="p-4">
        <List />
      </div>
    </div>
  );
};
