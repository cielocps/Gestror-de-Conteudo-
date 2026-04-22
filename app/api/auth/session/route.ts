import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('x_auth_session')?.value;
  if (!session) return NextResponse.json({ authenticated: false });

  try {
    const data = JSON.parse(session);
    return NextResponse.json({ authenticated: true, tokens: data });
  } catch (e) {
    return NextResponse.json({ authenticated: false });
  }
}
