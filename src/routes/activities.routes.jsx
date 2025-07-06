import { Activities } from '~/pages/Activities';

export default [
  {
    path: 'activities',
    children: [{ index: true, Component: Activities }],
  },
];
