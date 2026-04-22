import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_CONFIG } from '@/lib/oauth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  const savedState = request.cookies.get('x_oauth_state')?.value;
  const codeVerifier = request.cookies.get('x_oauth_code_verifier')?.value;

  if (!code || !state || !savedState || !codeVerifier || state !== savedState) {
    return new NextResponse('Estado inválido ou autorização cancelada', { status: 400 });
  }

  const clientId = process.env.X_CLIENT_ID;
  const clientSecret = process.env.X_CLIENT_SECRET;
  const appUrl = process.env.APP_URL || request.nextUrl.origin;
  const redirectUri = `${appUrl}/api/auth/x/callback`;

  if (!clientId || !clientSecret) {
    return new NextResponse('Configuração do X (Client ID/Secret) ausente', { status: 500 });
  }

  try {
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const tokenRes = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenRes.ok) {
      return new NextResponse('Falha na troca de tokens com o X', { status: 500 });
    }

    const tokens = await tokenRes.json();
    
    const htmlResponse = new NextResponse(`
      <html>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc;">
          <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; border: 1px solid #e2e8f0; max-width: 400px;">
            <h1 style="color: #0f172a; margin-bottom: 0.5rem; font-size: 1.5rem;">Conexão Bem-Sucedida!</h1>
            <p style="color: #64748b; font-size: 0.875rem;">Você pode fechar esta janela agora.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', tokens: ${JSON.stringify(tokens)} }, '*');
                window.close();
              }
            </script>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

    htmlResponse.cookies.delete('x_oauth_state');
    htmlResponse.cookies.delete('x_oauth_code_verifier');
    htmlResponse.cookies.set('x_auth_session', JSON.stringify(tokens), SESSION_COOKIE_CONFIG);

    return htmlResponse;
  } catch (error) {
    return new NextResponse('Erro interno no servidor', { status: 500 });
  }
}
