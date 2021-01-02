const controllers = require('./controllers')

module.exports = (server) => {
    // greetining//
    server.route('/')
        .get(controllers.about)
    // sending mails from researchcollective.io contact to form to email//
    server.route('/send-mail')
        .post(controllers.sendMail)
    server.route('/subscribe')
        .post(controllers.subscribe)
}