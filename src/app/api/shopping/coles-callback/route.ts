
// src/app/api/shopping/coles-callback/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import type { OrchestratorResult } from '@/types/shopping';
import { setTaskResult } from '@/lib/shopping-task-store';

export async function POST(request: NextRequest) {
  console.log(`[Coles Callback API] Received a POST request at ${new Date().toISOString()}`);
  
  // Log headers
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  console.log('[Coles Callback API] Request Headers:', JSON.stringify(headers, null, 2));

  let rawBody: string | null = null;
  try {
    // Try to read the body as text first for logging, then parse
    // Cloning is necessary because the body can only be read once
    const requestCloneForText = request.clone();
    rawBody = await requestCloneForText.text();
    console.log('[Coles Callback API] Raw request body:', rawBody);

    // Now parse the original request's body as JSON
    const data = await request.json() as OrchestratorResult;
    console.log('[Coles Callback API] Parsed JSON data:', JSON.stringify(data, null, 2));

    if (!data.request_id) {
      console.error('[Coles Callback API] Callback received without request_id. Body:', data);
      return NextResponse.json({ error: 'Callback data missing request_id' }, { status: 400 });
    }

    setTaskResult(data.request_id, data);
    console.log(`[Coles Callback API] Task result for request_id ${data.request_id} stored successfully.`);
    
    return NextResponse.json({ status: 'callback_received_and_processed' });

  } catch (error: any) {
    console.error('[Coles Callback API] Error processing shopping results callback:', error.message, error.stack);
    if (rawBody) {
      console.error('[Coles Callback API] Raw body on error:', rawBody);
    } else {
      // If rawBody is null, it means reading the body as text itself might have failed
      // or request.json() failed before text could be read (less likely with clone).
      // Attempt to read again if not already done, though this might fail if body already consumed by request.json() error.
      try {
        const errorBodyText = await request.text(); // This might fail if body already consumed
        console.error('[Coles Callback API] Raw body on error (attempt 2):', errorBodyText);
      } catch (textError: any) {
        console.error('[Coles Callback API] Could not read raw body on error:', textError.message);
      }
    }
    return NextResponse.json({ error: 'Failed to process callback', details: error.message }, { status: 500 });
  }
}
