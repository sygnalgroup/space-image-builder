'use client';

import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../shadcn/components/ui/popover';
import { Button } from '../shadcn/components/ui/button';
import { Calendar } from '../shadcn/components/ui/calendar';
import TextField from '../inputs/TextField';

export function DateTimePicker({ value, setValue }) {
  const [open, setOpen] = React.useState(false);

  const dateValue = value
    ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
    : null;
  const timeValue = value ? value.toTimeString().slice(0, 8) : '08:00:00';

  const handleDateChange = (date) => {
    if (!date) return;
    const [h, m, s] = timeValue.split(':');
    const newDate = new Date(date);
    newDate.setHours(Number(h), Number(m), Number(s));
    setValue(newDate);
    setOpen(false);
  };

  const handleTimeChange = (e) => {
    const [h, m, s] = e.target.value.split(':');
    const baseDate = value ? new Date(value) : new Date();
    baseDate.setHours(Number(h), Number(m), Number(s));
    setValue(baseDate);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <div className="flex grow flex-col">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="flex h-14 w-full flex-col items-start justify-start gap-0 border border-gray-200 font-normal"
            >
              <label className="block text-xs text-gray-500">Data</label>
              <div className="flex flex-row items-center gap-2 text-base">
                {value ? value.toLocaleDateString() : 'Select date'}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <TextField
          label="Hora"
          type="time"
          id="time-picker"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
