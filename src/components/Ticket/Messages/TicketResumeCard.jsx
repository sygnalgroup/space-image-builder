import React from 'react';
import { formatDate } from '~/core/utils/time';

import ForumIcon from '@mui/icons-material/Forum';

export const TicketResumeCard = ({ message, ticket }) => {
  return (
    <div className="flex flex-row">
      <div className="my-2 flex items-start px-2">
        <ForumIcon sx={{ fontSize: 40 }} className="-rotate-10 text-zinc-600" />
      </div>

      <div className="flex flex-1 flex-wrap p-2">
        <div className="mb-1 flex w-full items-end gap-2">
          <p className="font-bold">{message?.user?.fullName}</p>

          <p className="mb-[2px] text-xs text-gray-400">
            {formatDate(message?.createdAt, 'MM/DD/YYYY [at] HH:mm')}
          </p>
        </div>

        <div className="flex w-full overflow-hidden rounded-xl bg-zinc-700/50">
          <div className="w-1 bg-zinc-400"></div>

          <div className="flex w-full flex-wrap gap-4 p-4">
            <div className="flex w-full flex-wrap">
              <div className="w-full">
                <span className="font-bold">Full Name</span>
              </div>

              <div className="w-full">
                <span className="input">{message?.user?.fullName}</span>
              </div>
            </div>

            <div className="flex w-full flex-wrap">
              <div className="w-full">
                <span className="font-bold">Client Name</span>
              </div>

              <div className="flex w-full flex-wrap">
                <span className="input">{ticket?.client?.name}</span>
              </div>
            </div>

            <div className="flex w-full flex-wrap">
              <div className="w-full">
                {ticket?.category == 'issue' && (
                  <span className="font-bold">Issue</span>
                )}
                {ticket?.category == 'feature_request' && (
                  <span className="font-bold">Feature Request</span>
                )}
              </div>

              <div className="flex w-full flex-wrap">
                <span className="input">{message?.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
