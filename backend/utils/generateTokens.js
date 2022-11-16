const jwt = require('jsonwebtoken');
const UserToken = require('../models/UserToken');

/*
    generate access token and refresh token
    check the UserToken to find if there is a token already associated with the user using the user id
    if token found, remove it and assign a new refresh token to the user
    use the new token to log in the user
*/
const generateTokens = async(user) => {
    try {
        const payload = { _id: user._id, username: user.username, email: user.email, roles: user.roles };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '30d' }
        )
        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken })
    } catch (error) {
        return Promise.reject(error)
    }
};

module.exports = generateTokens;