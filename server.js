var express = require("express");

var app = express();


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var port = process.env.port || 8080;

app.listen(port, function(){
    console.log('Server running at http://127.0.0.1:8080/');
});
