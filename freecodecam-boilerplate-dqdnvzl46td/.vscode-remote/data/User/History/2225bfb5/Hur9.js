module.exports = function (app, myDataBase) {
    app.route('/').get((req, res) => {
        res.render('index', {
            title: 'Connected to Database',
            message: 'Please log in', 
            showLogin: true,
            showRegistration: true
        });
        });

    app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/profile');
    });

    app.route('/profile').get(ensureAuthenticated, (req, res) => {
        res.render('profile', {username: req.user.username});
    });

    app.route('/logout').get((req, res) => {
        req.logout();
        res.redirect('/');
    });



}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };