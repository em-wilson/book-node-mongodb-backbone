var findByString = function(searchStr, callback) {
  var searchRegex = new RegExp(searchStr, 'i');
  Account.find({
    $or: [
      { 'name.full': { $regex: searchRegex } },
      { email:       { $regex: searchRegex } }
    ]
  }, callback);
};