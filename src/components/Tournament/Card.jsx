import React from 'react';

import { IconUser } from '@tabler/icons-react';
import tournamentsStatus from '~/core/utils/tournamentsStatus';

export function TournamentCard({
  imageUrl = 'https://placehold.co/300x300',
  status = 'in_progress',
  title,
  date,
  venue,
  participants,
  extraBadge = '+5',
  sport = 'Padel',
}) {
  return (
    <div className="flex w-full max-w-xs cursor-pointer flex-col overflow-hidden bg-white transition-opacity duration-200 hover:opacity-90">
      <div className="relative flex aspect-square w-full items-center justify-center bg-gray-100">
        <div className="absolute top-2 left-2 z-10">
          <StatusBadge
            option={tournamentsStatus.find((x) => x.value === status)}
          />
        </div>
        <img
          src={imageUrl}
          alt="Torneio"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {/* Title */}
        <div className="text-sm leading-snug font-bold">{title}</div>

        <div className="text-xs text-gray-500">{date}</div>
        <div className="text-xs text-gray-500">{venue}</div>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
          <IconUser size={16} />
          <span>{participants} inscritos</span>
          <span>•</span>
          <span>{sport}</span>

          {extraBadge && (
            <span className="ml-2 rounded-full bg-lime-200 px-2 py-0.5 text-xs font-bold text-gray-800">
              {extraBadge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ option, className = '' }) => {
  if (!option) return null;
  const { icon, label, bg, text } = option;
  return (
    <span
      className={`inline-flex items-center rounded-xs px-2 py-1 text-xs font-extrabold ${bg} ${text} ${className}`}
    >
      {icon}
      {label}
    </span>
  );
};
