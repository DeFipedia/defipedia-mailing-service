const controllers = require('./controllers')

module.exports = (server) => {
    // about//
    server.route('/')
        .get(controllers.about)
    //mailchimp newsletter subscription//
    server.route('/subscribe')
        .post(controllers.subscribe)
    server.route('/sendmail')
        .post(controllers.sendMail)
}