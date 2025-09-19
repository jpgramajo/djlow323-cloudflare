import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req) {
    const { env } = await getCloudflareContext();

    const cookieString = env.DEV_MODE === '1'
        ? `auth_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
        : `auth_token=; HttpOnly; SameSite=Lax; Secure=true; Path=/; Max-Age=0`;

    const response = new Response(JSON.stringify({
        message: 'Logout successful'
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookieString
        },
    });

    return response;
}