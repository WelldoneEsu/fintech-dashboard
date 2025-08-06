const nodemailer = require('nodemailer');
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.creteTransaport({
        service:'gmail', // or your SMTP provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendEmail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
};

module.exports = sendEmail

