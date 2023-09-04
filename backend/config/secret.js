const jwtTokenGenarate = process.env.JWT_SECRET || "";
const jwtRefreshToken = process.env.JWT_REFRESH || "";
const resetJwtToken = process.env.RESET_PASSWORD_KEY || "";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const ClientURL = process.env.CLIENT_URL || "";

module.exports = {
    jwtTokenGenarate,
    jwtRefreshToken,
    resetJwtToken,
    smtpUsername,
    smtpPassword,
    ClientURL,

}



