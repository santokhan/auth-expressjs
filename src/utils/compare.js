import bcrypt from "bcryptjs";

/**
 * Compare a given password to a user's hashed password. It return a Promise
 * @param {Object} user - User object with a 'password' property
 * @param {string} password - Password to compare
 * @returns {Promise<boolean>} ⭐ - Whether the passwords match
 */
function comparePassword(user, password) {
    return bcrypt.compare(password, user.password);
};

// // Usage
// const user = { password: "$2a$10$cK7PDI6OXcJ.AE7pEOee4u/VeeZM3iF88U1ndIhR3ir6VM24JflhK" }
// comparePassword(user, "santo@1234").then((match) => {
//     console.log(match)
// })

export default comparePassword