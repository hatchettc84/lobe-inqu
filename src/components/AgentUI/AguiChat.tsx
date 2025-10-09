'use client';

import React, { useState } from 'react';

import { useAgui } from './AguiProvider';

/**
 * AG-UI Chat Interface Component
 *
 * A simple chat interface that demonstrates AG-UI's real-time
 * agent interaction capabilities.
 */

interface Message {
  content: string;
  id: string;
  metadata?: {
    thinking?: string;
    toolCalls?: string[];
  };
  role: 'user' | 'agent' | 'system';
  timestamp: Date;
}

interface AguiChatProps {
  className?: string;
  onMessage?: (message: Message) => void;
  placeholder?: string;
}

export function AguiChat({
  onMessage,
  placeholder = 'Ask your AI agent...',
  className = '',
}: AguiChatProps) {
  const { client, isConnected } = useAgui();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !client) return;

    const userMessage: Message = {
      content: input,
      id: Date.now().toString(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Implement AG-UI streaming
      // This is a placeholder for the actual AG-UI integration

      // Simulated agent response for now
      setTimeout(() => {
        const agentMessage: Message = {
          content: 'AG-UI integration coming soon! This will enable real-time agent streaming.',
          id: (Date.now() + 1).toString(),
          role: 'agent',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMessage]);
        setIsLoading(false);

        if (onMessage) {
          onMessage(agentMessage);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Connection Status */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="text-gray-600 dark:text-gray-400">
            {isConnected ? 'AG-UI Connected' : 'AG-UI Initializing...'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            key={message.id}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.role === 'agent'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            type="text"
            value={input}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading || !input.trim()}
            onClick={handleSend}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
