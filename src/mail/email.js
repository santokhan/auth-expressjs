const verificationMailOptions = {
    subject: 'Please Verify Your Email', // Subject line
    html(link) {
        return `<p>Please verify your email by clicking the following link:</p><a href="${link}">${link}</a>` // HTML body
    }
};

const forgotMailOptions = {
    subject: 'Please Reset Your Password', // Subject line
    html(link) {
        return `<p>Please reset your password by clicking the following link:</p><a href="${link}">${link}</a>` // HTML body
    }
};

export { verificationMailOptions, forgotMailOptions }