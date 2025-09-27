import { Resend } from 'resend';
import { getCloudflareContext } from '@opennextjs/cloudflare';

function isValidEmail(email) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(email);
}

async function verifyTurnstileToken(token, secret) {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
    });

    const outcome = await result.json();
    return outcome.success;
}

function formatQuoteEmail(data) {
    const eventTypeDisplay = data.eventType === 'other' ? data.customEventType : data.eventType;

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #fe9511; margin: 0; font-size: 28px;">New Quote Request</h1>
                    <p style="color: #666; margin: 10px 0 0 0;">DJLOW323 Website</p>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">📋 Personal Information</h2>
                    <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> ${data.email}</p>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">🎉 Event Details</h2>
                    <p style="margin: 8px 0; color: #555;"><strong>Event type:</strong> ${eventTypeDisplay}</p>
                    <p style="margin: 8px 0; color: #555;"><strong>Date:</strong> ${data.eventDate}</p>
                    <p style="margin: 8px 0; color: #555;"><strong>Approximate time:</strong> ${data.eventTime}</p>
                    <p style="margin: 8px 0; color: #555;"><strong>Location:</strong> ${data.eventLocation}</p>
                    ${data.eventDetails ? `
                        <div style="margin-top: 15px;">
                            <p style="margin: 8px 0; color: #555;"><strong>Additional details:</strong></p>
                            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #fe9511; border-radius: 4px;">
                                <p style="margin: 0; color: #666; line-height: 1.5;">${data.eventDetails}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #888; margin: 0; font-size: 14px;">
                        This request was sent from DJLOW323's website<br>
                        Date: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
                    </p>
                </div>
            </div>
        </div>
    `;
}

export async function POST(req) {
    try {
        const data = await req.json();
        const { env } = await getCloudflareContext();

        // Validar que todos los campos requeridos estén presentes
        const requiredFields = ['firstName', 'lastName', 'email', 'eventType', 'eventDate', 'eventTime', 'eventLocation', 'turnstileToken'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return new Response(JSON.stringify({
                message: `ERROR: Missing required fields: ${missingFields.join(', ')}`
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validar email
        if (!isValidEmail(data.email)) {
            return new Response(JSON.stringify({
                message: 'ERROR: The email provided is invalid'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validar el token de Turnstile
        const turnstileSecret = env.TURNSTILE_SECRET_KEY;
        if (!turnstileSecret) {
            return new Response(JSON.stringify({
                message: 'ERROR: Turnstile configuration is missing'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const isTurnstileValid = await verifyTurnstileToken(data.turnstileToken, turnstileSecret);
        if (!isTurnstileValid) {
            return new Response(JSON.stringify({
                message: 'ERROR: Security verification failed. Please try again.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Preparar datos para el email (sin incluir el token de Turnstile)
        const emailData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            eventType: data.eventType,
            customEventType: data.customEventType || '',
            eventDate: data.eventDate,
            eventTime: data.eventTime,
            eventLocation: data.eventLocation,
            eventDetails: data.eventDetails || ''
        };

        // Enviar email con Resend
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'DJLOW Website Quotes <noreply@notifications.djlow323.com>',
            to: ['deejaylow323@icloud.com'],
            subject: `New Quote Request - ${emailData.firstName} ${emailData.lastName}`,
            html: formatQuoteEmail(emailData),
        });

        return new Response(JSON.stringify({
            message: 'Quote request sent successfully. We will contact you soon!'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error processing quote request:', error);
        return new Response(JSON.stringify({
            message: 'ERROR: Internal server error. Please try again later.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}