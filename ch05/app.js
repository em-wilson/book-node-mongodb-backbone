var express = require('express');
var app = express();

app.configure(function(){
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
    res.render("index.jade", {layout:false});
});

app.listen(8080);
console.log("SocialNet is listening to port 8080.");
