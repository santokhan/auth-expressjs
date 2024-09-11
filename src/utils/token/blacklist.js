// In-memory store for blacklisted tokens
const blacklistedTokens = new Set();

// Function to add token to blacklist
function blacklistToken(token) {
    blacklistedTokens.add(token);
}

// Function to check if a token is blacklisted
function isTokenBlacklisted(token) {
    return blacklistedTokens.has(token);
}

export { blacklistToken, isTokenBlacklisted }