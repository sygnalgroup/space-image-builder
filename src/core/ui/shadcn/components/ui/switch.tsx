import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '~/core/utils/cn';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/90',
        destructive: 'bg-destructive hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary hover:bg-secondary/80',
      },
      size: {
        sm: 'h-4 w-6',
        default: 'h-6 w-10',
        lg: 'h-8 w-12',
        xl: 'h-9 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const thumbSizes = {
  sm: 'size-3',
  default: 'size-5',
  lg: 'size-6',
  xl: 'size-7',
};

const thumbPositions = {
  sm: 'data-[state=checked]:translate-x-2',
  default: 'data-[state=checked]:translate-x-4',
  lg: 'data-[state=checked]:translate-x-5',
  xl: 'data-[state=checked]:translate-x-6',
};

const Switch = forwardRef(
  ({ className, variant, size = 'default', ...rest }: any, ref) => {
    const notchSize = thumbSizes[size] || thumbSizes.default;
    const notchPosition = thumbPositions[size] || thumbPositions.default;
    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant, size }), className)}
        {...rest}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'bg-background pointer-events-none block rounded-full shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
            notchSize,
            notchPosition,
          )}
        />
      </SwitchPrimitives.Root>
    );
  },
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
