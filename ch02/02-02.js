var express = require('express');
var app = express();

app.set('views', __dirname + '/views');

app.get('/stooges/:name?', function(req, res, next) {
    var name = req.params.name;

    switch ( name ? name.toLowerCase() : '' ) {
        case 'larry':
        case 'curly': 
        case 'moe':
          res.render('stooges.jade', {stooge: name});
          break;

        default:
          next();
    }
});

app.get('/stooges/*?', function(req, res){
  res.render('stooges.jade', {stooge: null});
});

app.get('/?', function(req, res){
  res.render('index.jade');
});

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);
