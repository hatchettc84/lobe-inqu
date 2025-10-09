import { NextRequest, NextResponse } from 'next/server';

/**
 * AG-UI Streaming Endpoint
 *
 * This endpoint handles AG-UI protocol events using Server-Sent Events (SSE).
 * It provides real-time, bidirectional communication between agents and the UI.
 *
 * @see https://ag-ui.com/docs/concepts/events - AG-UI Event Types
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * AG-UI Event Types
 */
interface AguiEvent {
  data: any;
  timestamp: number;
  type: string;
}

/**
 * Send an AG-UI event to the client
 */
function sendEvent(controller: ReadableStreamDefaultController, event: AguiEvent) {
  const eventString = `data: ${JSON.stringify(event)}\n\n`;
  controller.enqueue(new TextEncoder().encode(eventString));
}

/**
 * Simulate agent streaming (placeholder)
 *
 * TODO: Replace with actual agent integration (LangGraph, CrewAI, etc.)
 */
async function simulateAgentStream(controller: ReadableStreamDefaultController, message: string) {
  // AGENT_START event
  sendEvent(controller, {
    data: { agentId: 'demo-agent-1', message },
    timestamp: Date.now(),
    type: 'AGENT_START',
  });

  // Simulate thinking/processing
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  sendEvent(controller, {
    data: {
      delta: 'I ',
      message: 'I',
    },
    timestamp: Date.now(),
    type: 'TEXT_MESSAGE_CONTENT',
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });

  sendEvent(controller, {
    data: {
      delta: 'am ',
      message: 'I am',
    },
    timestamp: Date.now(),
    type: 'TEXT_MESSAGE_CONTENT',
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });

  sendEvent(controller, {
    data: {
      delta: 'processing your request using AG-UI protocol. ',
      message: 'I am processing your request using AG-UI protocol.',
    },
    timestamp: Date.now(),
    type: 'TEXT_MESSAGE_CONTENT',
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 200);
  });

  sendEvent(controller, {
    data: {
      delta: 'This is a placeholder response. ',
      message: 'I am processing your request using AG-UI protocol. This is a placeholder response.',
    },
    timestamp: Date.now(),
    type: 'TEXT_MESSAGE_CONTENT',
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 200);
  });

  sendEvent(controller, {
    data: {
      delta: 'Full agent integration coming soon!',
      message:
        'I am processing your request using AG-UI protocol. This is a placeholder response. Full agent integration coming soon!',
    },
    timestamp: Date.now(),
    type: 'TEXT_MESSAGE_CONTENT',
  });

  // AGENT_END event
  sendEvent(controller, {
    data: {
      agentId: 'demo-agent-1',
      status: 'completed',
    },
    timestamp: Date.now(),
    type: 'AGENT_END',
  });
}

/**
 * POST /api/agent/stream
 *
 * Handles AG-UI streaming requests
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Simulate agent processing
          await simulateAgentStream(controller, message);

          // Close the stream
          controller.close();
        } catch (error) {
          console.error('Error in AG-UI stream:', error);

          // Send error event
          sendEvent(controller, {
            data: {
              error: error instanceof Error ? error.message : 'Unknown error',
              message: 'An error occurred during processing',
            },
            timestamp: Date.now(),
            type: 'ERROR',
          });

          controller.close();
        }
      },
    });

    // Return SSE response
    return new Response(stream, {
      headers: {
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
      },
    });
  } catch (error) {
    console.error('Error in AG-UI endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/agent/stream
 *
 * Returns endpoint information
 */
export async function GET() {
  return NextResponse.json({
    documentation: 'https://ag-ui.com/',
    endpoint: '/api/agent/stream',
    protocol: 'AG-UI',
    status: 'operational',
    transport: 'Server-Sent Events (SSE)',
    version: '0.1.0',
  });
}
