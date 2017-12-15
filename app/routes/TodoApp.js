/**
 * Created by Rui on 15/12/17.
 */
const Router = require('restify-router').Router
const fs = require('fs');

// main object
const routerInstance = new Router()

// constants
const prefix = "todo"

routerInstance.get('/fetch', (req, res, next) => {
  fs.readFile("./app/DB/store.json", (err, contents) => {
    if(err) {
      return console.log(err);
    }
    res.send(JSON.parse(contents))
  });

})

routerInstance.post('/store', (req, res, next) => {

  // console.log(req.body.payload)

  fs.writeFile("./app/DB/store.json", JSON.stringify(req.body.payload), (err) => {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  res.send({'message': 'works'})
})

module.exports = ({server}) => routerInstance.applyRoutes(server, prefix)
