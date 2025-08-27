
// src/app/api/shopping/trigger-coles-task/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import type { ShoppingListItem } from '@/context/meal-plan-context';
import type { ShoppingTaskItem, TriggerTaskRequestPayload } from '@/types/shopping';

const EXTERNAL_WEBHOOK_SERVER_URL = "https://7289-123-208-204-25.ngrok-free.app/trigger-shopping-task"; // User's webhook server with correct path

export async function POST(request: NextRequest) {
  let payloadForExternal: TriggerTaskRequestPayload | null = null;
  console.log(`[API /trigger-coles-task] Received request at ${new Date().toISOString()}`);

  try {
    const body = await request.json();
    console.log("[API /trigger-coles-task] Received body from frontend:", JSON.stringify(body, null, 2));

    const { shoppingList, requestId } = body as { shoppingList: ShoppingListItem[], requestId: string };

    // user_id is no longer required from the frontend since auth is removed
    if (!shoppingList || !requestId) {
      console.error("[API /trigger-coles-task] Missing required fields: shoppingList or requestId. Body:", body);
      return NextResponse.json({ error: 'Missing required fields: shoppingList or requestId' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      const errorMsg = "NEXT_PUBLIC_APP_URL is not set in environment variables.";
      console.error(`[API /trigger-coles-task] ${errorMsg}`);
      return NextResponse.json({ error: 'Application URL not configured on server.' }, { status: 500 });
    }
    const callbackUrl = `${appUrl}/api/shopping/coles-callback`;

    const shopping_items: ShoppingTaskItem[] = shoppingList.map(item => ({
      name: item.name,
      dish_name: item.mealName || "General Shopping", // Use mealName or default
      item_to_search: item.name, // Assuming item.name is suitable for searching
      quantity_description: item.quantity,
    }));

    payloadForExternal = {
      user_id: 'anonymous_user', // Hardcode user_id as auth is removed
      shopping_items,
      callback_url: callbackUrl,
      request_id: requestId,
    };

    console.log("[API /trigger-coles-task] Attempting to POST to external webhook.");
    console.log("[API /trigger-coles-task] Target URL:", EXTERNAL_WEBHOOK_SERVER_URL);
    console.log("[API /trigger-coles-task] Payload to be sent:", JSON.stringify(payloadForExternal, null, 2));

    const requestHeaders = {
      'Content-Type': 'application/json',
      // Add any other headers your webhook server might require, e.g., an API key
      // 'X-Webhook-Secret': 'YOUR_SHARED_SECRET_IF_ANY'
    };
    console.log("[API /trigger-coles-task] Headers for external request:", JSON.stringify(requestHeaders));

    const webhookResponse = await fetch(EXTERNAL_WEBHOOK_SERVER_URL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(payloadForExternal),
    });

    console.log(`[API /trigger-coles-task] External webhook response status: ${webhookResponse.status} ${webhookResponse.statusText}`);

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error(`[API /trigger-coles-task] Error from external webhook server. Status: ${webhookResponse.status}. Body: ${errorText}`);
      return NextResponse.json({
        error: `External webhook server error: ${webhookResponse.statusText || 'Unknown Error'}`,
        details: errorText,
        attemptedPayload: payloadForExternal
      }, { status: webhookResponse.status });
    }

    let responseData;
    const responseText = await webhookResponse.text();
    try {
        responseData = JSON.parse(responseText);
        console.log("[API /trigger-coles-task] Received acknowledgment from external webhook (parsed JSON):", responseData);
    } catch (e) {
        console.warn("[API /trigger-coles-task] External webhook response was not valid JSON. Raw text:", responseText);
        return NextResponse.json({ 
            message: "External webhook responded successfully but with non-JSON content.",
            rawResponse: responseText,
            sentPayload: payloadForExternal 
        });
    }
    
    return NextResponse.json({ ...responseData, sentPayload: payloadForExternal });

  } catch (error: any) {
    console.error('[API /trigger-coles-task] Error in route handler:', error);
    const responseBody: { error: string; details?: string; attemptedPayload?: TriggerTaskRequestPayload | null } = {
      error: error.message || 'Internal server error processing the request to external webhook.'
    };
    if (error.cause) {
        responseBody.details = String(error.cause);
    }
    if (payloadForExternal) {
      responseBody.attemptedPayload = payloadForExternal;
    }
    return NextResponse.json(responseBody, { status: 500 });
  }
}
