//dependencies
var express = require("express");
var path = require("path");

//set up express app
var app = express();
var PORT = process.env.PORT || 8080;

//requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use("/public", express.static(path.join(__dirname, "/public")));

// set up the express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
require("./controllers/api-routes.js")(app);

//syncing our sequelize models and then starting our express app
db.sequelize.sync({force: true}).then(function(){
  app.listen(PORT, function(){
    console.log("APP listening on PORT " + PORT);
  });
});
