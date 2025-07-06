import { Players } from '~/pages/Players';

export default [
  {
    path: 'players',
    children: [{ index: true, Component: Players }],
  },
];
