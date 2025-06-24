import React from 'react';

import { useParams } from 'react-router';
import TicketHeader from '../Header/TicketHeader';
import { TicketProviderContext } from '~/contexts/TicketContext';
import Files from './Files';

export const TicketFilesComponent = () => {
  const { ticketId } = useParams();
  return (
    <TicketProviderContext ticketId={ticketId}>
      <div className="flex h-full flex-col justify-end">
        <TicketHeader onlyBackButton />
        <div className="scrollbar-hidden h-full items-end overflow-y-auto">
          <Files />
        </div>
      </div>
    </TicketProviderContext>
  );
};
