
'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook to determine if a component has mounted on the client.
 * This is useful to prevent hydration mismatch errors when rendering UI
 * that depends on client-side state (e.g., auth status, localStorage).
 * 
 * @returns {boolean} `true` if the component is mounted, otherwise `false`.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
