import { NextResponse } from 'next/server';
import { generateRandomString, generateCodeChallenge, OAUTH_COOKIE_CONFIG } from '@/lib/oauth';

export async function GET(request: Request) {
  const clientId = process.env.X_CLIENT_ID;
  const appUrl = process.env.APP_URL || new URL(request.url).origin;

  if (!clientId) {
    return NextResponse.json({ error: 'X_CLIENT_ID não configurado no menu Settings' }, { status: 500 });
  }

  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const redirectUri = `${appUrl}/api/auth/x/callback`;
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'tweet.read users.read offline.access',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const url = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
  const response = NextResponse.json({ url });
  
  response.cookies.set('x_oauth_state', state, OAUTH_COOKIE_CONFIG);
  response.cookies.set('x_oauth_code_verifier', codeVerifier, OAUTH_COOKIE_CONFIG);

  return response;
}
