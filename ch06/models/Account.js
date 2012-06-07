var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
  email:     { type: String, index: true },
  name: {
    first:   { type: String },
    last:    { type: String }
  },
  birthday: {
    day:     { type: Number, min: 1, max: 31, required: false },
    month:   { type: Number, min: 1, max: 12, required: false },
    year:    { type: Number }
  },
  photoUrl:  { type: String },
  biography: { type: String }
});

var Account = mongoose.model('Account', AccountSchema);

module.exports = {
  Account: Account
};
