const Mailchimp = require('mailchimp-api-v3')
require('dotenv').config()

const controllers = {
    // data about service//
    about: (req, res) => {
        let aboutInfo = {
            name: properties.name,
            author: properties.author,
            version: properties.version
        }
        res.status(200).json(aboutInfo)
    },
    //function to add subscriber to mailchimp audience//
    subscribe: async (req, res) => {
      //extracting email fromm request//
      let {email} = req.body

      //mailchimp instance //
      const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

      //making requst to mailchip for adding member//
      mailchimp.post(`/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/`, {
        email_address: email,
        status: 'subscribed'
      })
      .then(result => {
        res.status(200).send({message: 'success'})
      })
      .catch(err => {
        res.send({message: err})
      })
    }
}

module.exports = controllers
