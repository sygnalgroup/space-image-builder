import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Dialog } from '~/core/ui/Dialog';
import { DropdownSelector } from '~/core/ui/DropdownSelector';
import { Button } from '~/core/ui/shadcn/components/ui/button';

const types = [
  {
    id: 'fromScratch',
    title: 'Do zero',
    description: 'Você vai adicionar todos detalhes manualmente.',
    select: false,
    soon: false,
  },
  {
    id: 'fromTournament',
    title: 'Baseado em um torneio',
    description: '',
    select: true,
    soon: false,
  },
  {
    id: 'ai',
    title: 'Usando IA',
    description:
      'Responda perguntas pra gerar um torneio quase instantaneamente.',
    select: false,
    soon: true,
  },
];

function CardType({ title, description, select, soon, onSelect }) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border border-[#E3E1F9] bg-white p-6 ${
        soon ? 'opacity-70' : ''
      }`}
    >
      <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-[#E3E1F9]">
        {soon && (
          <span className="absolute top-0 right-0 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
            Em breve
          </span>
        )}
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      {description && (
        <p className="mb-6 text-center text-sm text-gray-500">{description}</p>
      )}
      {select ? (
        <DropdownSelector options={[]} />
      ) : (
        !soon && <div className="mb-6" />
      )}
      <div className="grow"></div>
      <Button onClick={onSelect} className="w-full">
        Começar
      </Button>
    </div>
  );
}

export function ButtonNewTournament() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} className="rounded-2xl px-5 py-2">
        Criar torneio
      </Button>

      <Dialog
        open={open}
        size="4xl"
        onOpenChange={setOpen}
        title={<div className="text-2xl">Como quer criar o torneio?</div>}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {types.map((type) => (
            <CardType
              key={type.id}
              title={type.title}
              description={type.description}
              select={type.select}
              soon={type.soon}
              onSelect={() => navigate(`/tournaments/new/${type?.id}`)}
            />
          ))}
        </div>
      </Dialog>
    </div>
  );
}
