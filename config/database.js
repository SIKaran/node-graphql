const mongoose = require('mongoose');

let mongoDB;
const setupDB = callback => {
  mongoose.connect('mongodb+srv://dbUser:dbUser0501@cluster0-hpfxa.mongodb.net/test?retryWrites=true&w=majority');
  
  mongoose.connection.once('open', () => {
    callback('conneted to database');
  });
}

const getDB = () => mongoDB;



module.exports = { setupDB, getDB };