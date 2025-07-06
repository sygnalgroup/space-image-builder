import { Settings } from '~/pages/Settings';

export default [
  {
    path: 'settings',
    children: [{ index: true, Component: Settings }],
  },
];
