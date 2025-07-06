import React from 'react';
import { Link } from 'react-router';
import { Navbar } from '~/components/Navbar';
import { Button } from '~/core/ui/shadcn/components/ui/button';

export const Players = () => {
  return (
    <div>
      <Navbar
        left={
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">Jogadores</span>
          </div>
        }
        right={
          <Link to="/tournaments/new">
            <Button className="rounded-2xl px-5 py-2">Adicionar</Button>
          </Link>
        }
      />

      <div className="p-4">PLAYERS</div>
    </div>
  );
};
