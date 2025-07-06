import React from 'react';

export function Navbar({ left, center, right, ...props }) {
  return (
    <header
      className="flex w-full flex-col items-center gap-2 border-b bg-white p-2 sm:min-h-[56px] sm:flex-row sm:gap-x-2"
      {...props}
    >
      <div className="flex w-full items-center justify-between sm:w-auto">
        {left}
      </div>
      <div className="flex w-full justify-center sm:flex-1 sm:justify-start">
        {center}
      </div>
      <div className="flex w-full justify-end gap-2 sm:w-auto">{right}</div>
    </header>
  );
}
