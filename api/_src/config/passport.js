/* eslint-disable consistent-return */

import { Strategy as LocalStrategy } from "passport-local";
// import { setDefaultAlias } from '@/helpers/utils';
import Users from "../users/user.model.js";
// import { Strategy as GoogleStrategy } from 'passport-google-token';
// import FacebookStrategy from 'passport-facebook-token';
import bcrypt from "bcryptjs";
// import log from "@/helpers/log";
import passport from "passport";
// import uuid from 'uuid';

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log("Passport local strategy verification...");
        const user = await Users.findOneByEmail(email);

        if (!user) return done("invalid_credentials", false);

        if (!user.local.confirmed) {
          return done("email_address_not_confirmed", false);
        }

        bcrypt.compare(password, user.local.password, (err, isMatch) => {
          if (err) done("invalid_credentials", false);

          if (isMatch) {
            return done(null, user);
          }
          return done("invalid_credentials", false);
        });
      } catch (err) {
        console.error(err.message);
        done("invalid_credentials", false);
      }
    }
  )
);

// passport.use(
//   'google',
//   new GoogleStrategy(
//     {
//       clientID: process.env.API_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.API_GOOGLE_CLIENT_SECRET,
//       passReqToCallback: true,
//     },
//     async (req, token, tokenSecret, profile, done) => {
//       try {
//         log.info('Hi! Passport google verification...');
//         if (req.user) {
//           log.success('Hi! User already logged in, time for linking...');
//           const user = await Users.findOneByEmail(req.user.email);
//           user.methods.push('google');
//           user.google = {
//             id: profile.id,
//             email: profile.emails[0].value,
//           };
//           await user.save();
//           return done(null, user);
//         }

//         let user = await Users.findOne({ 'google.id': profile.id });
//         if (user) return done(null, user);

//         // Check if we have someone with the same email
//         log.success('Hi! Checking if the user exists...');
//         user = await Users.findOneByEmail(profile.emails[0].value);
//         if (user) {
//           log.success('Hi! User already exist... Updating account...');
//           user.methods.push('google');
//           user.google = {
//             id: profile.id,
//             email: profile.emails[0].value,
//           };
//           await user.save();
//           return done(null, user);
//         }

//         // Create a new account
//         log.success('Hi! Creating a new user from google verification...');
//         const newUser = new Users({
//           uuid: uuid.v4(),
//           methods: ['google'],
//           google: {
//             id: profile.id,
//             email: profile.emails[0].value,
//           },
//           lastName: profile.name.familyName,
//           firstName: profile.name.givenName,
//           alias: setDefaultAlias(profile.displayName),
//           photo: profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
//         });

//         await newUser.save();
//         done(null, newUser);
//       } catch (err) {
//         log.error(err.message);
//         done('invalid_credentials', false);
//       }
//     }
//   )
// );

// passport.use(
//   'facebook',
//   new FacebookStrategy(
//     {
//       clientID: process.env.API_FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.API_FACEBOOK_CLIENT_SECRET,
//       passReqToCallback: true,
//     },
//     async (req, token, tokenSecret, profile, done) => {
//       try {
//         log.info('Hi! Passport facebook verification...');
//         if (req.user) {
//           log.success('Hi! User already logged in, time for linking...');
//           const user = await Users.findOneByEmail(req.user.email);
//           user.methods.push('facebook');
//           user.facebook = {
//             id: profile.id,
//             email: profile.emails[0].value,
//           };
//           await user.save();
//           return done(null, user);
//         }

//         let user = await Users.findOne({ 'facebook.id': profile.id });
//         if (user) return done(null, user);

//         // Check if we have someone with the same email
//         log.success('Hi! Checking if the user exists...');
//         user = await Users.findOneByEmail(profile.emails[0].value);
//         if (user) {
//           log.success('Hi! User already exist... Updating account...');
//           user.methods.push('facebook');
//           user.facebook = {
//             id: profile.id,
//             email: profile.emails[0].value,
//           };
//           await user.save();
//           return done(null, user);
//         }

//         // Create a new account
//         log.success('Hi! Creating a new user from facebook verification...');
//         const newUser = new Users({
//           uuid: uuid.v4(),
//           methods: ['facebook'],
//           facebook: {
//             id: profile.id,
//             email: profile.emails[0].value,
//           },
//           lastName: profile.name.familyName,
//           firstName: profile.name.givenName,
//           alias: setDefaultAlias(profile.displayName),
//           photo: profile.photos[0].value,
//         });

//         await newUser.save();
//         done(null, newUser);
//       } catch (err) {
//         done('invalid_credentials', false);
//       }
//     }
//   )
// );

export default passport;
