// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var accountSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    isHotel: {
        type: Boolean,
        required: true
    },
    ethAccountAddress: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: '',
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Accounts = mongoose.model('Account', accountSchema);

// make this available to our Node applications
module.exports = Accounts;