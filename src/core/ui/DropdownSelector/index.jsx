import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '~/core/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../shadcn/components/ui/popover';
import { Button } from '../shadcn/components/ui/button';

export function DropdownSelector({
  value,
  setValue,
  options,
  collapsed = false,
  className,
}) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-10 w-full justify-between rounded-lg text-sm font-normal',
            collapsed && 'w-10 items-center justify-center px-0',
            className,
          )}
          aria-label="Selecionar organização"
        >
          <div className="flex items-center justify-center gap-2">
            {selected?.image && (
              <img
                src={selected.image}
                alt={selected.label}
                className="h-6 w-6 rounded"
              />
            )}
            {!collapsed && (
              <span>{selected ? selected.label : 'Selecionar'}</span>
            )}
          </div>
          {!collapsed && <IconChevronDown size={18} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn('w-64 p-0', collapsed && 'w-16')}
      >
        <ul>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setValue(opt.value);
                setOpen(false);
              }}
              className={cn(
                'hover:bg-muted flex cursor-pointer items-center gap-2 px-4 py-2 text-sm',
                value === opt.value && 'bg-muted/60 font-medium',
              )}
            >
              {opt.image && (
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="h-6 w-6 rounded"
                />
              )}
              {!collapsed && <span>{opt.label}</span>}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
