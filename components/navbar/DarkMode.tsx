'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function DarkMode() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}>
              {!isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Toggle Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={
            isDark === false ? 'bg-secondary text-secondary-foreground' : ''
          }
          onClick={() => {
            setIsDark(false);
            setTheme('light');
          }}>
          <Sun /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            isDark === true ? 'bg-secondary text-secondary-foreground' : ''
          }
          onClick={() => {
            setIsDark(true);
            setTheme('dark');
          }}>
          <Moon /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
            // Check system preference for initial state
            setIsDark(
              window.matchMedia('(prefers-color-scheme: dark)').matches
            );
          }}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DarkMode;
