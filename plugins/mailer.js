var nodemailer = require('nodemailer');

// Create transporter object using Gmail's SMTP service
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

console.log("Plugin mailer included");

// Function to send a test email
function sendTestEmail() {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.TEST_EMAIL_RECIPIENT, // Set recipient in env variables
        subject: 'Test Email from Node.js',
        text: 'This is a test email sent from the Nodemailer module.'
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Failed to send email. Error occurred: ', error);
        } else {
            console.log('Email sent successfully: ' + info.response);
        }
    });
}

// Automatically send the test email when the module is loaded
// sendTestEmail();

module.exports = transporter;
