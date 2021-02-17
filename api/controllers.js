const Mailchimp = require('mailchimp-api-v3')
const nodemailer = require("nodemailer");
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

      //making request to mailchimp for adding member//
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
    },
     // function to send email form defipedia.io's contact form to our inbox//
     sendMail: async (req, res)  => {
      const {fullName, email, message} = req.body
      // email template for now - will be moving to 'templates' later
      const emailContent = `
        <p>${message}<p>
        <p>
          <p>From: <p>
          <p>${fullName}</p>
          <p>${email}</p>
        </p>
      `
  
      // Note to self:- Do not push code with SMTP config, put them in environment variable//
      const transporter = await nodemailer.createTransport({
          host: 'smtp-pulse.com',//transporter host name
          port: 465,//transporter port
          secure: true, //true for port 465, false for other ports
          auth: {
              user: process.env.SENDPULSE_ACCOUNT_EMAIL, // sendpulse account email
              pass: process.env.SENDPULSE_ACCOUNT_PASSWORD, // sendpulse account password
            },
          //this is just for testing on localhost //
            tls: {
              rejectUnAuthorized: false
            }
      })
      // send mail with transporter//
      let mail = await transporter.sendMail({
          from: `"Research Collective Contact" <${process.env.TRANSPORTER_EMAIL}>`,
          to: process.env.TO_EMAIL, // can put multiple accounts//
          subject: 'DeFipedia Contact Request',
          // TODO: setting up some email template (maybe)
          text: message, //plain text body//
          html: emailContent//object from user's message
      })
      // Message sent//
      console.log("Message sent: %s", mail.messageId, mail);
      return res.status(200).json(`Email sent successfully to ${process.env.TO_EMAIL}`)
  }
}

module.exports = controllers
