/*
 * YABE - Authentication & Authorization
 */
const passport = require("passport");

module.exports = {
    basic: () => passport.authenticate('basic', {session: false}),
    facebook: () => passport.authenticate('facebook', {session: false}),
    twitter: () => passport.authenticate('twitter', {session: false}),
};
