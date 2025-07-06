import { IconChevronDown, IconEye } from '@tabler/icons-react';
import React from 'react';
import { Navbar } from '~/components/Navbar';
import TournamentForm from '~/components/Tournament/Form';
import { StepsSidebar } from '~/components/Tournament/StepsSidebar';
import { DropdownMenuRadio } from '~/core/ui/DropdownMenu';
import { Button } from '~/core/ui/shadcn/components/ui/button';

export const NewTournament = () => {
  return (
    <>
      <div className="hidden lg:block">
        <StepsSidebar currentStep={0} />
      </div>

      <div className="mt-2 bg-red-200 lg:ml-[270px]">
        <Navbar
          left={
            <div className="flex w-full min-w-0 flex-row items-center gap-1">
              <span className="flex-1 truncate text-base leading-tight font-medium">
                Novo Torneio
              </span>
              <div>
                <DropdownMenuRadio
                  options={[
                    { value: 'draft', label: 'Rascunho' },
                    { value: 'complete', label: 'Publicado' },
                  ]}
                  value="draft"
                  className="h-6 !rounded-sm bg-gray-200 px-0 text-xs"
                />
              </div>
            </div>
          }
          right={
            <>
              <Button
                variant="ghost"
                className="gap-2 px-2 py-1 text-sm font-normal"
              >
                <IconEye size={18} /> Pré visualizar
              </Button>
              <Button
                variant="default"
                className="rounded px-4 py-1 text-sm font-semibold"
              >
                Publicar
              </Button>
              <Button variant="ghost" className="px-2 py-1 text-sm font-normal">
                Mais <IconChevronDown size={16} />
              </Button>
            </>
          }
        />
      </div>
      <div className="h-screen flex-1 overflow-scroll p-2 pb-16 lg:ml-[270px]">
        <TournamentForm />
      </div>
    </>
  );
};
