'use client';

import * as React from 'react';

import { Button } from '../shadcn/components/ui/button';

import { IconChevronDown } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../shadcn/components/ui/dropdown-menu';

export function DropdownMenuRadio({
  options,
  value,
  onValueChange,
  title,
  className,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline">
          {options.find((opt) => opt.value === value)?.label || 'Select'}
          <IconChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {title && (
          <>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
