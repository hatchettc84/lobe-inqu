'use client';

import { AguiChat, AguiProvider } from '@/components/AgentUI';

/**
 * AG-UI Demo Page
 *
 * This page demonstrates the AG-UI integration in InQubatorAI.
 * It shows real-time agent-user interaction using the AG-UI protocol.
 */

export default function AguiDemoPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AG-UI Integration Demo
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Testing Agent-User Interaction Protocol in InQubatorAI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
            <AguiProvider endpoint="/api/agent/stream">
              <AguiChat className="h-full" placeholder="Try the AG-UI integration..." />
            </AguiProvider>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            AG-UI Protocol •{' '}
            <a
              className="hover:text-blue-500"
              href="https://ag-ui.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Documentation
            </a>{' '}
            •{' '}
            <a className="hover:text-blue-500" href="/AG-UI_INTEGRATION_PLAN.md" target="_blank">
              Integration Plan
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
