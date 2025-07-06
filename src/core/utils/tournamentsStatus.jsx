import { IconCheck, IconClock, IconProgress, IconX } from '@tabler/icons-react';

export default [
  {
    value: 'in_progress',
    label: 'EM ANDAMENTO',
    icon: <IconProgress size={16} className="mr-1" />,
    bg: 'bg-green-300',
    text: 'text-green-900',
  },
  {
    value: 'finished',
    label: 'FINALIZADO',
    icon: <IconCheck size={16} className="mr-1" />,
    bg: 'bg-gray-200',
    text: 'text-gray-900',
  },
  {
    value: 'cancelled',
    label: 'CANCELADO',
    icon: <IconX size={16} className="mr-1" />,
    bg: 'bg-red-200',
    text: 'text-red-900',
  },
  {
    value: 'scheduled',
    label: 'AGENDADO',
    icon: <IconClock size={16} className="mr-1" />,
    bg: 'bg-blue-200',
    text: 'text-blue-900',
  },
];
