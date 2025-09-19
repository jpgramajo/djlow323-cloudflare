import { Resend } from 'resend';
import { getCloudflareContext } from '@opennextjs/cloudflare';


function isValidEmail(email) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(email);
}

function generateCode(longitud = 6) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }
    return codigo;
}

export async function POST(req) {
    const data = await req.json()
    const { env } = await getCloudflareContext();

    if (!isValidEmail(data.email)) {
        return new Response(JSON.stringify({
            message: 'ERROR: The email provided is invalid'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const user = await env.djlow323db.prepare(
        "SELECT uuid, code_sent_at FROM accounts WHERE email = ? LIMIT 1",
    ).bind(data.email).first();

    if (!user) {
        return new Response(JSON.stringify({
            message: 'ERROR: There is no account with the given email address'
        }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    if (user.code_sent_at) {
        const lastSentTime = new Date(user.code_sent_at + 'Z');
        const currentTime = new Date();
        const timeDifference = currentTime - lastSentTime;
        const oneMinuteInMs = 60 * 1000;

        if (timeDifference < oneMinuteInMs) {
            return new Response(JSON.stringify({
                message: 'ERROR: You must wait 1 minute before requesting another verification code'
            }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    }

    const verificationCode = generateCode();

    const currentUTCTime = new Date().toISOString().replace('T', ' ').replace('Z', '');

    await env.djlow323db.prepare(
        "UPDATE accounts SET verification_code = ?, code_sent_at = ? WHERE uuid = ?"
    ).bind(verificationCode, currentUTCTime, user.uuid).run();

    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
        from: 'DJLOW323 Website Auth <noreply@notifications.djlow323.com>',
        to: [data.email],
        subject: 'Verification Code',
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    });

    return new Response(JSON.stringify({
        message: 'Verification code sent successfully. Check your email and spam folder.'
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}