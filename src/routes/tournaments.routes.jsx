import { Tournaments } from '~/pages/Tournaments';
import { EditTournament } from '~/pages/Tournaments/Edit';
import { NewTournament } from '~/pages/Tournaments/New';

export default [
  {
    path: 'tournaments',
    children: [
      { index: true, Component: Tournaments },
      {
        path: 'new/:type?',
        children: [{ index: true, Component: NewTournament }],
      },
      {
        path: 'edit/:id',
        children: [{ index: true, Component: EditTournament }],
      },
    ],
  },
];
