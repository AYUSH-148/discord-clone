'use client';

import { PropsWithChildren } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IActionTooltipProps extends PropsWithChildren {
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
}: IActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
