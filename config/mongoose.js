var mongoose = require('mongoose');




module.exports = {
    run: function() {        
        mongoose.connect('mongodb://localhost:27017/penside');

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error:'));
        db.once('open', function () {
            console.log('Database Connected.');
        });
    }
};
