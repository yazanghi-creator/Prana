import nodemailer from "nodemailer";

// Gmail SMTP configuration for sending real emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "pranaway7@gmail.com",
    pass: process.env.SMTP_PASS, // App Password from .env.local
  },
});

// Business/Doctor email - where booking notifications are sent
const BUSINESS_EMAIL = process.env.SMTP_USER || "pranaway7@gmail.com";

// Location for map links
const LOCATION_ADDRESS = "Sulzbacher Str. 94, 90489 Nürnberg, Deutschland";
const LOCATION_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  LOCATION_ADDRESS,
)}`;

// Email translations
const emailTranslations = {
  de: {
    bookingConfirmed: "Buchung bestätigt!",
    subject: "Ihr Termin ist bestätigt! - Prana Massage",
    dear: "Liebe/r",
    thankYou:
      "Vielen Dank für Ihre Buchung bei Prana Massage! Ihr Termin wurde bestätigt.",
    appointmentDetails: "Termindetails",
    service: "Leistung",
    date: "Datum",
    time: "Zeit",
    duration: "Dauer",
    minutes: "Minuten",
    total: "Gesamt",
    location: "Standort",
    openMaps: "📍 In Karten öffnen",
    cancelNote:
      "Müssen Sie stornieren oder umbuchen? Bitte kontaktieren Sie uns mindestens 24 Stunden vor Ihrem Termin.",
    rights: "Alle Rechte vorbehalten.",
    cancelledSubject: "Termin storniert - Prana Massage",
    cancelled: "Termin storniert",
    cancelledMessage: "Ihr Termin wurde storniert.",
    cancelledAppointment: "Stornierter Termin",
    seeYouSoon: "Wir hoffen, Sie bald wiederzusehen!",
    questions: "Fragen? Kontaktieren Sie uns:",
    newContactSubject: "Neue Kontaktanfrage",
    contactDetails: "Kontaktdaten",
    name: "Name",
    phone: "Telefon",
    message: "Nachricht",
    replyNote: "Antworten Sie direkt auf diese E-Mail, um zu antworten.",
  },
  en: {
    bookingConfirmed: "Booking Confirmed!",
    subject: "Your Appointment is Confirmed! - Prana Massage",
    dear: "Dear",
    thankYou:
      "Thank you for booking with Prana Massage! Your appointment has been confirmed.",
    appointmentDetails: "Appointment Details",
    service: "Service",
    date: "Date",
    time: "Time",
    duration: "Duration",
    minutes: "minutes",
    total: "Total",
    location: "Location",
    openMaps: "📍 Open in Maps",
    cancelNote:
      "Need to cancel or reschedule? Please contact us at least 24 hours before your appointment.",
    rights: "All rights reserved.",
    cancelledSubject: "Appointment Cancelled - Prana Massage",
    cancelled: "Appointment Cancelled",
    cancelledMessage: "Your appointment has been cancelled.",
    cancelledAppointment: "Cancelled Appointment",
    seeYouSoon: "We hope to see you again soon!",
    questions: "Questions? Contact us at:",
    newContactSubject: "New Contact Form Message",
    contactDetails: "Contact Details",
    name: "Name",
    phone: "Phone",
    message: "Message",
    replyNote: "Reply directly to this email to respond.",
  },
};

const formatDate = (date, lang = "de") => {
  return new Date(date).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function sendBookingConfirmation(booking, lang = "de") {
  if (!booking.customerEmail) {
    console.log("No email provided, skipping confirmation email");
    return { success: true, skipped: true };
  }

  const t = emailTranslations[lang] || emailTranslations.de;

  const mailOptions = {
    from: '"Prana Massage" <pranaway7@gmail.com>',
    to: booking.customerEmail,
    subject: t.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 500px; margin: 0 auto; background: #F4E1D2; padding: 30px; border-radius: 16px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="width: 60px; height: 60px; background: #2F4F4F; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; text-align: center;">
              <span style="font-size: 30px; color: white;">✓</span>
            </div>
            <h1 style="color: #2F4F4F; margin: 0; font-size: 24px; font-weight: bold;">${
              t.bookingConfirmed
            }</h1>
          </div>
          
          <!-- Greeting -->
          <p style="color: #000000; font-size: 16px; margin-bottom: 10px;">${
            t.dear
          } <strong>${booking.customerName}</strong>,</p>
          
          <p style="color: #000000; font-size: 16px; margin-bottom: 25px;">${
            t.thankYou
          }</p>
          
          <!-- Appointment Details Card -->
          <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
            <h2 style="color: #2F4F4F; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">${
              t.appointmentDetails
            }</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.service
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  booking.service
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.date
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${formatDate(
                  booking.date,
                  lang,
                )}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.time
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  booking.time
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.duration
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  booking.duration
                } ${t.minutes}</td>
              </tr>
              <tr>
                <td style="padding: 15px 0 5px; font-weight: bold; color: #000000; font-size: 16px;">${
                  t.total
                }:</td>
                <td style="padding: 15px 0 5px; text-align: right; font-weight: bold; color: #2F4F4F; font-size: 22px;">€${
                  booking.price
                }</td>
              </tr>
            </table>
          </div>
          
          <!-- Location Card -->
          <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
            <h3 style="color: #000000; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">${
              t.location
            }</h3>
            <p style="margin: 0 0 15px 0; color: #000000; font-size: 15px;">Sulzbacher Str. 94<br>90489 Nürnberg, Deutschland</p>
            <a href="${LOCATION_MAPS_URL}" style="display: inline-block; background: #2F4F4F; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">${
              t.openMaps
            }</a>
          </div>
          
          <!-- Footer Note -->
          <p style="color: #000000; font-size: 14px; margin-bottom: 20px;">
            ${t.cancelNote}
          </p>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Prana Massage. ${t.rights}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error: error.message };
  }
}

export async function sendCancellationEmail(booking, lang = "de") {
  if (!booking.customerEmail) {
    console.log("No email provided, skipping cancellation email");
    return { success: true, skipped: true };
  }

  const t = emailTranslations[lang] || emailTranslations.de;

  const mailOptions = {
    from: '"Prana Massage" <pranaway7@gmail.com>',
    to: booking.customerEmail,
    subject: t.cancelledSubject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 500px; margin: 0 auto; background: #F4E1D2; padding: 30px; border-radius: 16px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="width: 60px; height: 60px; background: #e74c3c; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; text-align: center;">
              <span style="font-size: 30px; color: white;">✕</span>
            </div>
            <h1 style="color: #e74c3c; margin: 0; font-size: 24px; font-weight: bold;">${
              t.cancelled
            }</h1>
          </div>
          
          <!-- Greeting -->
          <p style="color: #000000; font-size: 16px; margin-bottom: 10px;">${
            t.dear
          } <strong>${booking.customerName}</strong>,</p>
          
          <p style="color: #000000; font-size: 16px; margin-bottom: 25px;">${
            t.cancelledMessage
          }</p>
          
          <!-- Cancelled Appointment Details Card -->
          <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
            <h2 style="color: #e74c3c; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">${
              t.cancelledAppointment
            }</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.service
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  booking.service
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${
                  t.date
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${formatDate(
                  booking.date,
                  lang,
                )}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #000000; font-size: 15px;">${
                  t.time
                }:</td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000000; font-size: 15px;">${
                  booking.time
                }</td>
              </tr>
            </table>
          </div>
          
          <!-- Rebook Message -->
          <p style="color: #000000; font-size: 15px; margin-bottom: 20px;">
            ${t.seeYouSoon}
          </p>
          
          <!-- Footer Note -->
          <p style="color: #000000; font-size: 14px; margin-bottom: 20px;">
            ${t.questions} <strong>pranaway7@gmail.com</strong>
          </p>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Prana Massage. ${t.rights}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Cancellation email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending cancellation email:", error);
    return { success: false, error: error.message };
  }
}

// Send notification to business owner when a new booking is created
export async function sendNewBookingNotification(booking, lang = "de") {
  const t = emailTranslations.de; // Always in German for business owner

  const receivedAt = new Date().toLocaleString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: '"Prana Massage Website" <pranaway7@gmail.com>',
    to: BUSINESS_EMAIL,
    subject: `🗓️ Neue Buchung: ${booking.customerName} - ${booking.service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #A8D5BA;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #F4E1D2 0%, #f8ece3 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #2F4F4F 0%, #4a7c7c 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Neue Buchung eingegangen!</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">Eingegangen am ${receivedAt}</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            
            <!-- Alert Badge -->
            <div style="background: linear-gradient(135deg, #A8D5BA 0%, #8bc9a3 100%); border-radius: 12px; padding: 15px 20px; margin-bottom: 25px; text-align: center;">
              <p style="margin: 0; color: #2F4F4F; font-size: 15px; font-weight: 500;">
                🎉 Ein neuer Termin wurde über die Website gebucht
              </p>
            </div>
            
            <!-- Customer Details Card -->
            <div style="background: #ffffff; border-radius: 16px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
                <span style="font-size: 24px; margin-right: 12px;">👤</span>
                <h2 style="color: #2F4F4F; font-size: 18px; margin: 0; font-weight: 600;">Kundendaten</h2>
              </div>
              
              <!-- Name -->
              <div style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">
                <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${t.name}</p>
                <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">${booking.customerName}</p>
              </div>
              
              <!-- Phone -->
              <div style="padding: 8px 0; border-bottom: 1px solid #f5f5f5;">
                <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${t.phone}</p>
                <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">
                  <a href="tel:${booking.customerPhone}" style="color: #2F4F4F; text-decoration: none;">${booking.customerPhone}</a>
                </p>
              </div>
              
              ${
                booking.customerEmail
                  ? `
              <!-- Email -->
              <div style="padding: 8px 0;${booking.customerAddress ? " border-bottom: 1px solid #f5f5f5;" : ""}">
                <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail</p>
                <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">
                  <a href="mailto:${booking.customerEmail}" style="color: #2F4F4F; text-decoration: none;">${booking.customerEmail}</a>
                </p>
              </div>
              `
                  : ""
              }
              
              ${
                booking.customerAddress
                  ? `
              <!-- Address -->
              <div style="padding: 8px 0;">
                <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Adresse</p>
                <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">${booking.customerAddress}</p>
              </div>
              `
                  : ""
              }
            </div>
            
            <!-- Appointment Details Card -->
            <div style="background: #ffffff; border-radius: 16px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
                <span style="font-size: 24px; margin-right: 12px;">📋</span>
                <h3 style="color: #2F4F4F; font-size: 18px; margin: 0; font-weight: 600;">${t.appointmentDetails}</h3>
              </div>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${t.service}:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2F4F4F; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${booking.service}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${t.date}:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2F4F4F; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${formatDate(booking.date, lang)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${t.time}:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2F4F4F; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${booking.time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${t.duration}:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #2F4F4F; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${booking.duration} ${t.minutes}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0 5px; font-weight: bold; color: #2F4F4F; font-size: 16px;">${t.total}:</td>
                  <td style="padding: 15px 0 5px; text-align: right; font-weight: bold; color: #2F4F4F; font-size: 22px;">€${booking.price}</td>
                </tr>
              </table>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #2F4F4F; padding: 25px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">
              © ${new Date().getFullYear()} Prana Massage. ${t.rights}
            </p>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 8px 0 0 0;">
              Diese E-Mail wurde automatisch nach einer neuen Buchung generiert.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("New booking notification sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending new booking notification:", error);
    return { success: false, error: error.message };
  }
}

export async function sendContactFormEmail(contactData) {
  // Contact form emails go to business, always in German for the business owner
  const t = emailTranslations.de;

  // Format the current date and time
  const receivedAt = new Date().toLocaleString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: '"Prana Massage Website" <pranaway7@gmail.com>',
    to: BUSINESS_EMAIL,
    replyTo: contactData.email,
    subject: `✉️ ${t.newContactSubject}: ${contactData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #A8D5BA;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #F4E1D2 0%, #f8ece3 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #2F4F4F 0%, #4a7c7c 100%); padding: 40px 30px; text-align: center;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
              <span style="font-size: 40px; line-height: 80px;">💌</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Neue Kundenanfrage</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">Eingegangen am ${receivedAt}</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px;">
            
            <!-- Alert Badge -->
            <div style="background: linear-gradient(135deg, #A8D5BA 0%, #8bc9a3 100%); border-radius: 12px; padding: 15px 20px; margin-bottom: 25px; text-align: center;">
              <p style="margin: 0; color: #2F4F4F; font-size: 15px; font-weight: 500;">
                🔔 Ein potenzieller Kunde hat Sie über das Kontaktformular erreicht
              </p>
            </div>
            
            <!-- Contact Details Card -->
            <div style="background: #ffffff; border-radius: 16px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
                <span style="font-size: 24px; margin-right: 12px;">👤</span>
                <h2 style="color: #2F4F4F; font-size: 18px; margin: 0; font-weight: 600;">${
                  t.contactDetails
                }</h2>
              </div>
              
              <!-- Name -->
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
                <div style="width: 40px; height: 40px; background: #F4E1D2; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="font-size: 18px; line-height: 40px;">✨</span>
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${
                    t.name
                  }</p>
                  <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">${
                    contactData.name
                  }</p>
                </div>
              </div>
              
              <!-- Email -->
              <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
                <div style="width: 40px; height: 40px; background: #F4E1D2; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="font-size: 18px; line-height: 40px;">📧</span>
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail</p>
                  <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">
                    <a href="mailto:${
                      contactData.email
                    }" style="color: #2F4F4F; text-decoration: none;">${
                      contactData.email
                    }</a>
                  </p>
                </div>
              </div>
              
              ${
                contactData.phone
                  ? `
              <!-- Phone -->
              <div style="display: flex; align-items: center; padding: 12px 0;">
                <div style="width: 40px; height: 40px; background: #F4E1D2; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="font-size: 18px; line-height: 40px;">📱</span>
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${t.phone}</p>
                  <p style="margin: 4px 0 0 0; color: #2F4F4F; font-size: 16px; font-weight: 600;">
                    <a href="tel:${contactData.phone}" style="color: #2F4F4F; text-decoration: none;">${contactData.phone}</a>
                  </p>
                </div>
              </div>
              `
                  : ""
              }
            </div>
            
            <!-- Message Card -->
            <div style="background: #ffffff; border-radius: 16px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
                <span style="font-size: 24px; margin-right: 12px;">💬</span>
                <h3 style="color: #2F4F4F; font-size: 18px; margin: 0; font-weight: 600;">${
                  t.message
                }</h3>
              </div>
              <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; border-left: 4px solid #2F4F4F;">
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${
                  contactData.message
                }</p>
              </div>
            </div>
            
            <!-- Quick Reply Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${
                contactData.email
              }?subject=Re: Ihre Anfrage bei Prana Massage" style="display: inline-block; background: linear-gradient(135deg, #2F4F4F 0%, #4a7c7c 100%); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(47,79,79,0.3); transition: all 0.3s ease;">
                ✉️ Direkt antworten
              </a>
            </div>
            
            <!-- Footer Note -->
            <p style="color: #888; font-size: 13px; text-align: center; margin: 0; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              ${t.replyNote}
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #2F4F4F; padding: 25px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">
              © ${new Date().getFullYear()} Prana Massage. ${t.rights}
            </p>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 8px 0 0 0;">
              Diese E-Mail wurde automatisch vom Kontaktformular generiert.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact form email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return { success: false, error: error.message };
  }
}
