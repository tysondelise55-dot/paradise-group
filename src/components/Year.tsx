'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/* Current year, read on the client so pages stay fully static under Cache
   Components (a server-side `new Date()` would make every page dynamic). The
   server render shows the build year as a sensible fallback. */
const BUILD_YEAR = 2026;

export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <span suppressHydrationWarning>{year}</span>;
}
