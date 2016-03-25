var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        
        // tell passport which id to use for username
        console.log('serializing user:',user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        // returns user object back
        return done(null, users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check if user exists\
            if (users["username"] === username){
                console.log('User Not Found with username '+username);
                return done(null, false);
            }

            // check if password is correct
            if (isValidPassword(users[username], password)){
                console.log('successfully signed in');
                return done(null, users[username]);
            }
            else {
                console.log('Invalid password ' + username);
                return done(null, false); 
            }
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // check if the user already exists
            if (users["username"] === username) {
                console.log('User already exists with username: ' + username);
                return done(null, false)
            }

            // add user to db
            users[username] = {

                username: username,
                password: createHash(password)
            };

            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};