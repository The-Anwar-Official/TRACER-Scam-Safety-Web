import { NextRequest, NextResponse } from 'next/server';
import { assessMessage } from '@/lib/risk';

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || !('message' in body) || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Please provide a message string.' }, { status: 400 });
    }
    const message = body.message.trim();
    if (!message) return NextResponse.json({ error: 'Paste a message to check.' }, { status: 400 });
    if (message.length > 5000) return NextResponse.json({ error: 'Please keep the message under 5,000 characters.' }, { status: 413 });
    // The message is analysed in memory only; it is not written to a database.
    return NextResponse.json(assessMessage(message), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Could not read that request. Try again.' }, { status: 400 });
  }
}
