import { cn } from '~/core/utils/cn';
import {
  Dialog as SNDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../shadcn/components/ui/dialog';

// size: one of 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export function Dialog({
  open,
  onOpenChange,
  size = 'md',
  title,
  children,
  footer,
  ...props
}) {
  const sizeClass = DIALOG_SIZE[size] || DIALOG_SIZE.md;

  return (
    <SNDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(sizeClass, 'w-full')} {...props}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </SNDialog>
  );
}

// Size classes
const DIALOG_SIZE = {
  xs: '!max-w-xs',
  sm: '!max-w-sm',
  md: '!max-w-md',
  lg: '!max-w-lg',
  xl: '!max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};
