const { default: axios } = require('axios')
const { post } = require('request')
const request = require('request')
const properties = require('../package.json')
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

      let url = `https://us2.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/`
      
      let data = {
        members: [
          {
            email_address: email,
            status: 'subscribed'
          }
          
        ]
      }

      let postData = JSON.stringify(data)

      let options = {
        url: url,
        methods: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `auth ${process.env.MAILCHIMP_API_KEY}`
        },
        body: postData
      }

      if(email){
        request(options, (err, response, body) => {
          if(err){
            res.json({error: err})
          }else{
            res.status(200).json({message: 'Success'})
          }
        })
      }else{
        res.json({message: 'Failed'})
      }
      //if email is not empty, make post request to mailchimp//
    //   if(email && email != ''){
    //     axios.post(url,{
    //       headers: {
    //         Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`
    //       }
    //     })
    //     .then((response) => {
    //       res.send(response)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    //   }else{
    //     res.status(404).send({message: 'Failed'})
    //   }
    }
}

module.exports = controllers
