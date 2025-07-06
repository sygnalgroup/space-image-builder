import { Payments } from '~/pages/Payments';

export default [
  {
    path: 'payments',
    children: [{ index: true, Component: Payments }],
  },
];
