const mongoose = require('mongoose')

mongoose.connect(process.env.EAuction_ConnString, (err) => {
    if (!err)
        console.log('MongoDB connection succeded...')
    else
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2))
});

module.exports = mongoose