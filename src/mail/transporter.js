import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env

if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be defined in environment variables')
}

// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,   // Your Gmail address
        pass: EMAIL_PASS    // Your Gmail password or app-specific password 16 digits xxxx-xxxx-xxxx-xxxx
    }
});

export default transporter