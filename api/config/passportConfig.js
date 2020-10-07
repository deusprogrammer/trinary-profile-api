import jwtStrategy from 'passport-jwt/lib/strategy'
import extractJwt from 'passport-jwt/lib/extract_jwt'

import authConfig from './authConfig'

export let jwtAuthStrategy = new jwtStrategy({
    secretOrKey: authConfig.key,
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        console.log(JSON.stringify(token.user, null, 5))
        return done(null, token.user)
    } catch (error) {
        return done(error)
    }
})