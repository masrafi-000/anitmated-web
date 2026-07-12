import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER || "";
const smtpAccessToken = process.env.SMTP_OAUTH_ACCESS_TOKEN || "";
const smtpClientId = process.env.SMTP_OAUTH_CLIENT_ID || "";
const smtpClientSecret = process.env.SMTP_OAUTH_CLIENT_SECRET || "";
const smtpRefreshToken = process.env.SMTP_OAUTH_REFRESH_TOKEN || "";
// If SMTP settings are missing, log OTP to console (for development)
const isConfigured = !!smtpUser && (!!smtpAccessToken || (!!smtpClientId && !!smtpClientSecret && !!smtpRefreshToken));

const authConfig = smtpClientId && smtpClientSecret && smtpRefreshToken
  ? {
      type: "OAuth2" as const,
      user: smtpUser,
      clientId: smtpClientId,
      clientSecret: smtpClientSecret,
      refreshToken: smtpRefreshToken,
    }
  : {
      type: "OAuth2" as const,
      user: smtpUser,
      accessToken: smtpAccessToken,
    };

export const transporter = isConfigured
  ? nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: authConfig,
    })
  : null;

export async function sendOtpEmail(email: string, otp: string) {
  const mailOptions = {
    from: `"Ruby Studio Admin" <${smtpUser || "noreply@rubystudio.com"}>`,
    to: email,
    subject: "Password Reset Verification Code",
    text: `Your password reset verification code is: ${otp}\nThis code will expire in 15 minutes.`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Password Reset Verification</h2>
        <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
        <div style="font-size: 24px; font-weight: bold; background: #f0f0f0; padding: 10px 20px; display: inline-block; letter-spacing: 2px; margin: 10px 0;">
          ${otp}
        </div>
        <p>This code will expire in 15 minutes.</p>
        <p>If you did not request this reset, please ignore this email.</p>
      </div>
    `,
  };

  if (transporter) {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } else {
    console.warn("⚠️ SMTP settings are not configured in .env. Logging OTP to console for development:");
    console.warn(`🔑 [OTP Reset Code] Email: ${email} | Code: ${otp}`);
  }
}
