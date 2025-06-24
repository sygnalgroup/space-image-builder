import React, { useContext } from 'react';
import { formatDate, formatDateSmart } from '~/core/utils/time';
import { useMessages } from './useMessages';
import { TicketContext } from '~/contexts/TicketContext';
import useMessagesSocket from './useMessagesSocket';
import { TicketResumeCard } from './TicketResumeCard';
import { MessageItem } from './MessageItem';
import { EmptyMessages } from './EmptyMessage';
import AIAnalysisSidebar from '../AIAnalysis';

function areMessagesFromSameDay(dateTimePrevMessage, dateTimeMessage) {
  return (
    formatDate(dateTimePrevMessage, 'DD/MM/YYYY') ==
    formatDate(dateTimeMessage, 'DD/MM/YYYY')
  );
}

export const Messages = () => {
  const { ticket, ticketId } = useContext(TicketContext);

  const { messages } = useMessages({ ticketId });
  useMessagesSocket({ ticketId });

  return (
    <div className="scrollbar-hidden h-full items-end overflow-y-auto">
      <AIAnalysisSidebar isVisible={!!ticketId} ticketId={ticketId} />
      {!ticketId && (!messages || messages?.length === 0) && <EmptyMessages />}
      <div className="w-full pb-4">
        {messages?.map((message, index) => (
          <div key={index}>
            {index > 0 &&
              !areMessagesFromSameDay(
                messages[index - 1]?.createdAt,
                message?.createdAt,
              ) && (
                <div className="relative mx-4 py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-600"></div>
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-background-secondary px-2 text-sm font-semibold text-zinc-400">
                      {formatDateSmart(message?.createdAt)}
                    </span>
                  </div>
                </div>
              )}

            <div className="group pl-4 hover:bg-zinc-800/70">
              {index === 0 && (
                <TicketResumeCard message={message} ticket={ticket} />
              )}

              {index !== 0 && (
                <MessageItem
                  index={index}
                  message={message}
                  messages={messages}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
