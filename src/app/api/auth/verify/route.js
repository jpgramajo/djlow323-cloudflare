import jwt from 'jsonwebtoken';
import { getCloudflareContext } from '@opennextjs/cloudflare';

function isValidEmail(email) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(email);
}

export async function POST(req) {
    const data = await req.json();
    const { env } = await getCloudflareContext();

    if (!data.email || !data.code) {
        return new Response(JSON.stringify({
            message: 'ERROR: Email and verification code are required'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!isValidEmail(data.email)) {
        return new Response(JSON.stringify({
            message: 'ERROR: The email provided is invalid'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!/^[A-Z0-9]{6}$/.test(data.code)) {
        return new Response(JSON.stringify({
            message: 'ERROR: Invalid code'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user = await env.djlow323db.prepare(
        "SELECT uuid, verification_code, account_secret, code_sent_at FROM accounts WHERE email = ? LIMIT 1"
    ).bind(data.email).first();

    if (!user) {
        return new Response(JSON.stringify({
            message: 'ERROR: There is no account with the given email address'
        }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!user.verification_code || user.verification_code !== data.code) {
        return new Response(JSON.stringify({
            message: 'ERROR: Invalid verification code'
        }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (user.code_sent_at) {
        const sentTime = new Date(user.code_sent_at + 'Z');
        const currentTime = new Date();
        const timeDifference = currentTime - sentTime;
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (timeDifference > fiveMinutesInMs) {
            return new Response(JSON.stringify({
                message: 'ERROR: Verification code has expired. Please request a new one.'
            }), {
                status: 410,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    const jwtSecret = env.JWT_APP_SECRET + user.account_secret;
    const token = jwt.sign(
        {
            uuid: user.uuid,
            email: data.email
        },
        jwtSecret,
        { expiresIn: '7d' }
    );

    const isSecure = env.DEV_MODE === '1' ? false : true;

    const cookieString = env.DEV_MODE === '1'
        ? `auth_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`
        : `auth_token=${token}; HttpOnly; SameSite=Lax; Secure=true; Path=/; Max-Age=604800`;

    console.log('DEV_MODE:', env.DEV_MODE, 'isSecure:', isSecure);
    console.log('Setting cookie:', cookieString);

    const response = new Response(JSON.stringify({
        message: 'Authentication successful',
        result: true
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookieString
        },
    });

    return response;
}