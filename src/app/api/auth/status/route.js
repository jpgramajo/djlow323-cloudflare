import jwt from 'jsonwebtoken';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(req) {
    const { env } = await getCloudflareContext();

    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
        return new Response(JSON.stringify({
            message: 'ERROR: No authentication cookie found. Please allow cookies.'
        }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(cookie => {
            const [key, value] = cookie.trim().split('=');
            return [key, value];
        })
    );

    const authToken = cookies.auth_token;
    if (!authToken) {
        return new Response(JSON.stringify({
            message: 'ERROR: Authentication cookie not found'
        }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const decoded = jwt.decode(authToken, { complete: true });
        if (!decoded) {
            return new Response(JSON.stringify({
                message: 'ERROR: Invalid format for token'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await env.djlow323db.prepare(
            "SELECT uuid, account_secret FROM accounts WHERE uuid = ? LIMIT 1"
        ).bind(decoded.payload.uuid).first();

        if (!user) {
            return new Response(JSON.stringify({
                message: 'ERROR: Invalid sesion'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const jwtSecret = env.JWT_APP_SECRET + user.account_secret;
        jwt.verify(authToken, jwtSecret);

        return new Response(JSON.stringify({
            result: true
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: 'ERROR: Invalid or expired token'
        }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}