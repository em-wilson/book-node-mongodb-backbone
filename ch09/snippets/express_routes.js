fs.readdirSync('routes').forEach(function(file) {
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)(app);
});
