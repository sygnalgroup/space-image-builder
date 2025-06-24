import React, { useContext, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { TicketContext } from '~/contexts/TicketContext';
import { MenuButton } from '~/components/Layout/MenuButton';
import ToDoListModal from '../TodoList/Modal';
import { Tooltip } from '@mui/material';
import { NavLink } from 'react-router';
import { BackButton } from '~/core/ui/Buttons/BackButton';

const TicketHeader = ({ onlyBackButton }) => {
  const { ticket } = useContext(TicketContext);

  const [openTodoListModal, setOpenTodoListModal] = useState(false);

  return (
    <div className="flex h-14 flex-shrink-0 items-center border-b border-zinc-700 px-4 shadow">
      <MenuButton />
      <ToDoListModal
        open={openTodoListModal}
        handleClose={() => setOpenTodoListModal(false)}
      />
      <div className="flex flex-1 flex-row flex-wrap items-start sm:gap-2">
        <span className="text-base font-bold text-gray-100 sm:text-lg">
          <span className="ml-2 font-bold text-gray-400">#&nbsp;</span>
          {ticket?.name || 'New Ticket'}
        </span>

        {ticket?.id && (
          <div className="flex gap-2 pl-4 sm:pl-0">
            <span className="rounded-full bg-zinc-700 px-2 py-1 text-[10px] font-medium text-white sm:text-xs">
              {ticket?.client?.name}
            </span>
            <span className="rounded-full bg-green-700 px-2 py-1 text-[10px] font-medium text-white sm:text-xs">
              {ticket?.category === 'issue' ? 'Issue' : 'Feature'}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-x-3 text-xl text-gray-400">
        {onlyBackButton ? (
          <Tooltip title="Back">
            <div>
              <BackButton icon />
            </div>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Edit">
              <EditIcon
                className="cursor-pointer hover:text-white"
                titleAccess="Edit"
                fontSize="medium"
              />
            </Tooltip>
            <Tooltip title="Files">
              {ticket?.id && (
                <NavLink to={`/app/tickets/${ticket.id}/files`}>
                  {({ isActive }) => (
                    <>
                      <AttachFileIcon
                        className={`cursor-pointer hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}
                        titleAccess="Files"
                        fontSize="medium"
                      />
                    </>
                  )}
                </NavLink>
              )}
            </Tooltip>
            <Tooltip title="To-Do List">
              <ChecklistIcon
                className="cursor-pointer hover:text-white"
                titleAccess="To-Do List"
                fontSize="medium"
                onClick={() => setOpenTodoListModal(true)}
              />
            </Tooltip>
            <Tooltip title="Pined Messages">
              <PushPinIcon
                className="cursor-pointer hover:text-white"
                titleAccess="Pined Messages"
                fontSize="medium"
              />
            </Tooltip>
            <div className="relative hidden md:flex">
              <input
                type="text"
                placeholder="Search"
                className="input !h-8 w-48"
              />
              <Tooltip title="Pesquisar">
                <SearchIcon
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  fontSize="small"
                />
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketHeader;
