'use client';

import { type ReactNode, createContext, useContext, useMemo } from 'react';

// Placeholder type for future AG-UI client wiring
type AguiClient = unknown;

/**
 * AG-UI Context for InQubatorAI
 *
 * This provides AG-UI functionality throughout the application,
 * enabling real-time agent-user interactions.
 */

interface AguiContextValue {
  client: AguiClient | null;
  isConnected: boolean;
}

const AguiContext = createContext<AguiContextValue>({
  client: null,
  isConnected: false,
});

interface AguiProviderProps {
  children: ReactNode;
  endpoint?: string;
  options?: {
    maxReconnectAttempts?: number;
    reconnect?: boolean;
    transport?: 'sse' | 'websocket';
  };
}

/**
 * AG-UI Provider Component
 *
 * Wrap your application with this provider to enable AG-UI functionality.
 *
 * @example
 * ```tsx
 * <AguiProvider endpoint="/api/agent/stream">
 *   <YourApp />
 * </AguiProvider>
 * ```
 */
export function AguiProvider({
  children,
  endpoint = '/api/agent/stream',
  options = {},
}: AguiProviderProps) {
  const client = useMemo(() => {
    // Initialize AG-UI client
    // For now, we'll create a placeholder
    // This will be fully implemented in the next phase
    return null;
  }, [endpoint, options]);

  const value = useMemo(
    () => ({
      client,
      isConnected: false,
    }),
    [client],
  );

  return <AguiContext.Provider value={value}>{children}</AguiContext.Provider>;
}

/**
 * Hook to access AG-UI client
 *
 * @example
 * ```tsx
 * const { client, isConnected } = useAgui();
 * ```
 */
export function useAgui() {
  const context = useContext(AguiContext);

  if (!context) {
    throw new Error('useAgui must be used within an AguiProvider');
  }

  return context;
}
