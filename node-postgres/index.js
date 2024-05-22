const express = require('express')
const app = express()
const port = 3001

const merchant_model = require('./model_dish')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/id=:p1&list_num=:p2&region=:p3&type=:p4&difficulty=:p5&time=:p6', (req, res) => {
    console.log("p1="+req.params.p1+"p2="+req.params.p2+"p3="+req.params.p3+"p4="+req.params.p4+"p5="+req.params.p5+"p6="+req.params.p6)
    merchant_model.getRecipe(req.params.p1,req.params.p2,req.params.p3,req.params.p4,req.params.p5,req.params.p6)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.get('/countrecipe/id=:p1&list_num=:p2&region=:p3&type=:p4&difficulty=:p5&time=:p6', (req, res) => {
    merchant_model.getCountRecipe(req.params.p1,req.params.p2,req.params.p3,req.params.p4,req.params.p5,req.params.p6)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.get('/regionrecipe/', (req, res) => {
    merchant_model.getRegionRecipe()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.get('/typerecipe/', (req, res) => {
    merchant_model.getTypeRecipe()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.get('/difficultyrecipe/', (req, res) => {
    merchant_model.getDifficultyRecipe()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})