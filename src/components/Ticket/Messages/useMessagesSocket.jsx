import { useCallback, useEffect, useState } from 'react';
import { authKey } from '~/core/api';
import humps from 'humps';

import ActionCable from 'actioncable';
import { useQueryClient } from '@tanstack/react-query';

// EVENTS TYPES
const eventsTypes = {
  MESSAGE_CREATED: 'message_created',
  MESSAGE_UPDATED: 'message_updated',
  MESSAGE_DELETED: 'message_deleted',
};

function useMessagesSocket({ ticketId }) {
  const [connected, setConnected] = useState(false);
  const queryClient = useQueryClient();

  const received = useCallback(
    (data) => {
      const payload = humps.camelizeKeys(data);

      if (payload?.type === eventsTypes.MESSAGE_CREATED) {
        if (payload.message) {
          queryClient.setQueryData(['messages', ticketId], (old = []) => [
            ...old,
            payload.message,
          ]);
        }
      }
    },
    [queryClient, ticketId],
  );

  useEffect(() => {
    let channelCable = null;
    let cable = null;

    if (ticketId) {
      const authHeaders = {
        Authorization: localStorage.getItem(authKey),
      };
      const queryString = new URLSearchParams(authHeaders).toString();

      cable = ActionCable.createConsumer(
        `${import.meta.env.VITE_SOCKET_API_URL}?${queryString}`,
      );

      channelCable = cable.subscriptions.create(
        {
          channel: 'TicketChannel',
          ticket_id: ticketId,
        },
        {
          connected: () => setConnected(true),
          disconnected: () => setConnected(false),
          received: (data) => {
            console.log('Received data from channel:', data);
            received(data);
          },
          rejected: () => {
            console.error('Subscription rejected');
            setConnected(false);
          },
        },
      );
    }

    return () => {
      if (channelCable) {
        channelCable.unsubscribe();
      }
      if (cable) {
        cable.disconnect();
      }
    };
  }, [received, ticketId]);

  return {
    connected,
  };
}

export default useMessagesSocket;
