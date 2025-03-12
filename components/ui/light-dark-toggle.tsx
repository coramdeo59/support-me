"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

type Props = {
    className?: string;
};

export function LightDarkToggle({ className }: Props) {
    const [isDark, setIsDark] = useState(false);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className}
                    onClick={() => {
                        setIsDark((prev) => !prev);
                        document.body.classList.toggle("dark");
                    }}
                
                >
                    {isDark ? <SunIcon  /> : <MoonIcon />}
                </TooltipTrigger>
                <TooltipContent>
                    {isDark ? "Switch to light mode" : "Switch to dark mode"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}