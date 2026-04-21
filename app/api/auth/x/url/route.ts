import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.X_CLIENT_ID;
  const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/x/callback`;
  
  if (!clientId) {
    return NextResponse.json({ error: 'X_CLIENT_ID is not configured' }, { status: 500 });
  }

  // X OAuth 2.0 Authorization URL construction
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'tweet.read tweet.write users.read offline.access',
    state: 'state', // In a real app, generate a secure random state
    code_challenge: 'challenge', // In a real app, use PKCE
    code_challenge_method: 'plain' // Use S256 for better security
  });

  const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;

  return NextResponse.json({ url: authUrl });
}
