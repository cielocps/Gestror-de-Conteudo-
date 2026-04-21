import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new NextResponse(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error}' }, '*');
            window.close();
          </script>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }

  if (!code) {
    return new NextResponse('No code provided', { status: 400 });
  }

  // In a real app, you would exchange the code for a token here:
  // const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', { ... });
  // const tokens = await tokenResponse.json();

  // For this demo, we'll just simulate success
  return new NextResponse(`
    <html>
      <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center;">
          <h2>Autenticação com X concluída!</h2>
          <p>Esta janela fechará automaticamente...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              setTimeout(() => {
                window.close();
              }, 1000);
            }
          </script>
        </div>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}
