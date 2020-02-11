const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalUrl = baseUrl + crypto + fiat ;
  var quant = req.body.num;
  if(crypto!=="none"&&fiat!=="none"){
      request(finalUrl,function(error, response, body){
      var data = JSON.parse(body);
      var price = data.last;
      var currentDate = data.display_timestamp;
      price = price*quant;
      res.render("result", { time : currentDate , price : price , quant : quant , from : crypto , to : fiat});
      // res.sendFile(__dirname + "/result.html");
      // res.write("<p>The current date is "+ currentDate + "</p>");
      // res.write("<h1>The current price of "+ crypto + " is " + price + fiat + " </h1>");
      // res.send();
      });
    }
    else{
      res.render("error");
    }
});

app.listen(1000,function(){
  console.log("server is running on port :1000");
});
