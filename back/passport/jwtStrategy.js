const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.jwtSecretKey
    }, async (jwtPayload, done) => {
        User.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                console.error(err);
                return done(err);
            })
    }));
};