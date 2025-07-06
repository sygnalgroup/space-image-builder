import React from 'react';
import { TournamentCard } from './Card';

const tournaments = [
  {
    id: 1,
    title: 'Torneio de Inauguração Villa Clube – Etapa NovaNet',
    date: 'Sexta 28 de fev a 31 mar',
    venue: 'Villa Clube – Canguçu',
    participants: 240,
    sport: 'Padel',
  },
  // Add more tournament objects here as needed
];

const List = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {tournaments.map((tournament) => (
      <TournamentCard
        key={tournament.id}
        title={tournament.title}
        date={tournament.date}
        venue={tournament.venue}
        participants={tournament.participants}
        sport={tournament.sport}
      />
    ))}
  </div>
);

export default List;
