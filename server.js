const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.get("/api/quotes/random",(req,res,next)=>{
const quote=getRandomElement(quotes);
res.status(200).send({quote:quote});
})
app.get("/api/quotes",(req,res,next)=>{
if(!req.query.person){

return res.send({quotes:quotes});
}
const filteredQuote=quotes.filter((quote)=>{
  return quote.person==req.query.person;
});
res.send({quotes:filteredQuote})
})

app.post("/api/quotes",(req,res,next)=>{
 
  if(req.query.quote && req.query.person){
    quotes.push(req.query)
   
    res.status(201).send(req.query);
  }
  else{
    res.sendStatus(400);
  }
})

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT,()=>{
console.log("Server Initiated ");
});