import { useQuery } from '@tanstack/react-query';

import { getTicketMessages } from '~/modules/ticket';

export const useMessages = ({ ticketId } = {}) => {
  const { data: messages, isFetching: isLoading } = useQuery({
    queryKey: ['messages', ticketId],
    enabled: !!ticketId,
    queryFn: () => getTicketMessages({ ticketId }),
  });

  return {
    isLoading,
    messages,
  };
};
