import React from 'react';
import { TicketForm } from './Form/Form';
import { TicketProviderContext } from '~/contexts/TicketContext';
import { useParams } from 'react-router';
import { Messages } from './Messages';
import TicketHeader from './Header/TicketHeader';

export const TicketComponent = () => {
  const { ticketId } = useParams();
  return (
    <TicketProviderContext ticketId={ticketId}>
      <div className="flex h-full flex-col justify-end">
        <TicketHeader />
        <Messages />
        <TicketForm />
      </div>
    </TicketProviderContext>
  );
};
