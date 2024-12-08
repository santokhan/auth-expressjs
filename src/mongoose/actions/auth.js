import { verificationMailOptions, forgotMailOptions } from "../../mail/email.js"
import transporter from "../../mail/transporter.js"
import { decodeRefreshToken } from "../../utils/token.js"
import User from "../models/User.js"
import dotenv from "dotenv"

dotenv.config()

const from = process.env.EMAIL_USER
if (!from) {
    throw new Error('EMAIL_USER must be defined in environment variables')
}

function signup({ email, password }) {
    const user = new User({ email, password })
    return user.save()
}

async function signin(email, password) {
    try {
        const user = await User.findOne({ email })
        if (!user) return null // User not found // immediate return

        const match = user.comparePassword(password)
        if (!match) return null // Wrong password // immediate return

        return user
    } catch (error) {
        console.log(error)
    }
}

async function signout(id) {
    try {
        const updatedUser = await User.updateOne({ _id: id }, { refreshToken: null })
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}

function find(email) {
    return User.findOne({ email })
}

function verify(email) {
    return User.updateOne({ email }, { verified: true })
}

function forgot(email) {

}

function reset(email) {

}

async function sendVerificationEmail(to, verificationLink) {
    const { subject, html } = verificationMailOptions
    try {
        await transporter.sendMail({
            from,
            to,
            subject,
            html: html(verificationLink)
        });
        console.log('Verification Email sent successfully');
    } catch (error) {
        console.error('Error verification sending email:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

async function sendForgotPasswordEmail(to, forgotLink) {
    const { subject, html } = forgotMailOptions
    try {
        await transporter.sendMail({
            from,
            to,
            subject,
            html: html(forgotLink)
        });
        console.log('Reset Email sent successfully');
    } catch (error) {
        console.error('Error reset sending email:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

export { signup, signin, signout, find, verify, forgot, reset, sendVerificationEmail, sendForgotPasswordEmail }