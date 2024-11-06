module.exports = function (app, myDataBase) {
    app.route('/').get((req, res) => {
        res.render('index', {
          title: 'Connected to Database',
          message: 'Please log in', 
          showLogin: true,
          showRegistration: true
        });
      });

      

}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };