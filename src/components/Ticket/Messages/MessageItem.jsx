import React from 'react';
import { formatDate } from '~/core/utils/time';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Markdown from 'markdown-to-jsx';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import TrashIcon from '@mui/icons-material/DeleteForever';

function areMessagesFromSameDay(dateTimePrevMessage, dateTimeMessage) {
  return (
    formatDate(dateTimePrevMessage, 'DD/MM/YYYY') ==
    formatDate(dateTimeMessage, 'DD/MM/YYYY')
  );
}

export const MessageItem = ({ messages, index, message }) => {
  const showAvatar =
    index == 1 ||
    messages[index - 1]?.userId != message?.userId ||
    !areMessagesFromSameDay(messages[index - 1]?.createdAt, message?.createdAt);

  return (
    <div className={showAvatar ? 'relative flex' : 'relative flex pl-14'}>
      {showAvatar && (
        <div className="my-2 flex w-14 items-start px-2">
          <AccountCircleIcon sx={{ fontSize: 50 }} className="text-zinc-400" />
        </div>
      )}

      <div className="absolute -top-2 right-2 z-20 hidden group-hover:flex group-hover:opacity-100">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-700/90 px-2 py-1 shadow-lg">
          <span role="img" aria-label="emoji">
            😊
          </span>
          <span role="img" aria-label="emoji">
            👍
          </span>
          <span role="img" aria-label="emoji">
            ❤️
          </span>
          <PushPinIcon
            className="cursor-pointer text-gray-400 hover:text-white"
            titleAccess="Mensagens Fixadas"
            fontSize="small"
          />
          <EditIcon
            className="cursor-pointer text-gray-400 hover:text-white"
            titleAccess="Editar"
            fontSize="small"
          />
          <TrashIcon
            className="cursor-pointer text-gray-400 hover:text-white"
            titleAccess="Remover"
            fontSize="small"
          />
        </div>
      </div>

      <div>
        {showAvatar && (
          <div className="flex w-full items-end gap-2 px-2 pt-2">
            <p className="font-bold">{message?.user.fullName}</p>

            <p className="mb-[2px] text-xs text-gray-400">
              {formatDate(message?.createdAt, 'MM/DD/YYYY [at] HH:mm')}
            </p>
          </div>
        )}

        <div className="relative">
          {!showAvatar && (
            <div className="absolute left-0 mt-[5px] -ml-10 w-12">
              <div className="hidden text-xs text-gray-400 group-hover:flex">
                {formatDate(message?.createdAt, 'HH:mm')}
              </div>
            </div>
          )}

          <div className="pl-2 text-gray-200">
            <Markdown>{message?.text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
