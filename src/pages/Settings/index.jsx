import React from 'react';
import { Navbar } from '~/components/Navbar';

export const Settings = () => {
  return (
    <div>
      <Navbar
        left={
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">Configurações</span>
          </div>
        }
      />

      <div className="p-4">Settings</div>
    </div>
  );
};
