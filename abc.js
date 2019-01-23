var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');


const route=require('./route/index')
var app=express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(route);

app.listen(3008,function()
{
   console.log("server running at port 3008"); 
})




