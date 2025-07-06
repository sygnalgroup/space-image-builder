import {
  Tooltip as SnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '../shadcn/components/ui/tooltip';

export function Tooltip({ text, children, show = true }) {
  if (!show) {
    return children;
  }
  return (
    <SnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      {show && (
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      )}
    </SnTooltip>
  );
}
