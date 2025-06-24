import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTicket } from '~/modules/ticket';

// eslint-disable-next-line react-refresh/only-export-components
export const TicketContext = createContext(null);

export function TicketProviderContext({ children, ticketId }) {
  const { data: ticket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ['ticket', ticketId],
    enabled: !!ticketId,
    queryFn: () => getTicket({ ticketId }),
  });
  return (
    <TicketContext.Provider value={{ ticketId, ticket, isLoadingTicket }}>
      {children}
    </TicketContext.Provider>
  );
}
