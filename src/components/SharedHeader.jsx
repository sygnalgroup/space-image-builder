import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { MenuButton } from './Layout/MenuButton';

const SharedHeader = ({ title, rightActions, showSearch }) => {
  return (
    <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-zinc-700 px-4 py-4 shadow">
      <MenuButton />
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <span className="text-lg font-bold text-gray-100">{title}</span>
      </div>
      <div className="flex items-center justify-end gap-x-3 text-xl text-gray-400">
        {rightActions}
        {/* <AttachFileIcon
          className="cursor-pointer hover:text-white"
          titleAccess="Enviar Imagem"
          fontSize="medium"
        />
        <ChecklistIcon
          className="cursor-pointer hover:text-white"
          titleAccess="Lista de Tarefas"
          fontSize="medium"
        />
        <PushPinIcon
          className="cursor-pointer hover:text-white"
          titleAccess="Mensagens Fixadas"
          fontSize="medium"
        /> */}
        {showSearch && (
          <div className="relative hidden md:flex">
            <input
              type="text"
              placeholder="Search"
              className="w-48 rounded bg-[#202225] px-2 py-1 text-sm focus:outline-none"
            />
            <SearchIcon
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
              fontSize="small"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedHeader;
