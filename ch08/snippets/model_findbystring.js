var findByString = function(searchStr, cb) {
  var searchRegex = new RegExp(searchStr, 'i');
  Account.find({
    $or: [
      { 'name.full': { $regex: searchRegex } },
      { email:       { $regex: searchRegex } }
    ]
  }, cb);
};