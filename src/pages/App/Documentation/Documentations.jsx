import React from 'react';

import SharedHeader from '~/components/SharedHeader';
import { List } from '~/components/Documentation/List';
import { NavLink } from 'react-router';
import CreateIcon from '@mui/icons-material/Add';

export const Documentations = () => {
  const isAdmin = true; // Replace with actual admin check logic
  return (
    <section className="flex h-screen flex-col">
      <SharedHeader
        title="Documentations"
        showSearch
        rightActions={
          <div>
            {isAdmin && (
              <NavLink to={'new'}>
                <CreateIcon
                  className="cursor-pointer hover:text-white"
                  titleAccess="Enviar Imagem"
                  fontSize="medium"
                />
              </NavLink>
            )}
          </div>
        }
      />
      <List />
    </section>
  );
};
