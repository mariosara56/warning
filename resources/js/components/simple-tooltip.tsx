import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SimpleTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
}

export default function SimpleTooltip({ content, children }: SimpleTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
        </Tooltip>
    );
}
