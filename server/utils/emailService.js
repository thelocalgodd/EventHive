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

module.exports = {
  sendRegistrationConfirmation,
  sendEventReminder
};