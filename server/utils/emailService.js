const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Send registration confirmation email
const sendRegistrationConfirmation = async (userEmail, eventDetails) => {
  try {
    const result = await resend.emails.send({
      from: 'EventHive <noreply@eventhive.xyz>', 
      to: userEmail,
      subject: `Registration Confirmed - ${eventDetails.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Registration Confirmed!</h2>
          <p>Thank you for registering for <strong>${eventDetails.title}</strong></p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Event Details:</h3>
            <p><strong>Title:</strong> ${eventDetails.title}</p>
            <p><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${eventDetails.time || new Date(eventDetails.date).toLocaleTimeString()}</p>
            <p><strong>Location:</strong> ${eventDetails.location}</p>
            ${eventDetails.description ? `<p><strong>Description:</strong> ${eventDetails.description}</p>` : ''}
          </div>
          
          <p>We look forward to seeing you at the event!</p>
          <p>Best regards,<br>Event Management Team</p>
        </div>
      `
    });

    console.log('Registration confirmation email sent successfully:', result.id);
    return result;
  } catch (error) {
    console.error('Error sending registration confirmation email:', error);
    throw error;
  }
};

// Send event reminder email
const sendEventReminder = async (userEmail, eventDetails) => {
  try {
    const result = await resend.emails.send({
      from: 'EventHive <noreply@eventhive.xyz>',
      to: userEmail,
      subject: `Reminder: ${eventDetails.title} Tomorrow`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Event Reminder</h2>
          <p>This is a friendly reminder that you have an event tomorrow!</p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0; color: #007bff;">${eventDetails.title}</h3>
            <p><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${eventDetails.time || new Date(eventDetails.date).toLocaleTimeString()}</p>
            <p><strong>Location:</strong> ${eventDetails.location}</p>
          </div>
          
          <p>Don't forget to attend! We're excited to see you there.</p>
          <p>Best regards,<br>Event Management Team</p>
        </div>
      `
    });

    console.log('Event reminder email sent successfully:', result.id);
    return result;
  } catch (error) {
    console.error('Error sending event reminder email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetURL) => {
  try {
    const result = await resend.emails.send({
      from: 'EventHive <noreply@eventhive.xyz>',
      to: userEmail,
      subject: 'EventHive Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0;">EventHive</h1>
          </div>
          
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hi ${userName},</p>
          <p>You requested a password reset for your EventHive account.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <p style="margin-bottom: 20px;">Click the button below to reset your password:</p>
            <a href="${resetURL}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Important:</strong></p>
            <ul style="margin: 10px 0; color: #856404;">
              <li>This link will expire in 24 hours</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>For security, do not share this link with anyone</li>
            </ul>
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #007bff;">${resetURL}</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The EventHive Team
          </p>
        </div>
      `
    });

    console.log('Password reset email sent successfully:', result.id);
    return result;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Generic email sender (for flexibility)
const sendEmail = async ({ email, subject, message }) => {
  try {
    const result = await resend.emails.send({
      from: 'EventHive <noreply@eventhive.xyz>',
      to: email,
      subject: subject,
      html: message
    });

    console.log('Email sent successfully:', result.id);
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendRegistrationConfirmation,
  sendEventReminder,
  sendPasswordResetEmail,
  sendEmail
};