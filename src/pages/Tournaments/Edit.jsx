import { IconChevronDown, IconEye } from '@tabler/icons-react';
import React from 'react';
import { Navbar } from '~/components/Navbar';
import { DropdownMenuRadio } from '~/core/ui/DropdownMenu';
import { Button } from '~/core/ui/shadcn/components/ui/button';

export const EditTournament = () => {
  return (
    <div>
      <Navbar
        left={
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base leading-tight font-medium">
              Editar Torneio
            </span>
          </div>
        }
        center={
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

      <div className="p-4">dsadsdkjsd</div>
    </div>
  );
};
