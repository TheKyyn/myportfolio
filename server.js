const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const uri = process.env.DB_URI;
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('contact-form-db')
    const contactsCollection = db.collection('contacts')

    app.post('/contacts', (req, res) => {
      const contact = {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        subject: req.body.subject,
        yourMessage: req.body.message
      };

      contactsCollection.insertOne(contact)
        .then(result => {
          res.json({ message: 'Your message has been sent. Thank you.' });
        })
        .catch(error => console.error(error))
    })
  })
  .catch(console.error)

app.listen(3000, function() {
  console.log('listening on 3000')
})
