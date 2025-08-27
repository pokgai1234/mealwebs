// src/app/api/shopping/get-task-result/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getTaskResult } from '@/lib/shopping-task-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get('requestId');

  if (!requestId) {
    return NextResponse.json({ error: 'requestId query parameter is required' }, { status: 400 });
  }

  const result = getTaskResult(requestId);

  if (result) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ status: 'pending' });
  }
}
