"use client";

import * as React from "react";
import { Clapperboard } from "lucide-react";

export function TeamSwitcher() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-purple-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Clapperboard />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-bold">Sofi Movies</span>
        <span className="truncate text-xs">Caso de uso peliculas</span>
      </div>
    </div>
  );
}
