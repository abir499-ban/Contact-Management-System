const mongoose = require('mongoose');
function connectToDB(link){
    return mongoose.connect(link).then(() => console.log("MongoDB connected"));
}

module.exports = {
    connectToDB
}