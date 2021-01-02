const properties = require('../package.json')
const nodemailer = require('nodemailer')

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
      res.status(200).send('yay!!!')
    }
}

module.exports = controllers