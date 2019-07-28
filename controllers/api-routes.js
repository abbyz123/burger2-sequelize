// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/", function (req, res) {
        db.Burger.findAll({})
            .then(function (dbBurger) {
                let burgers = new Array();
                dbBurger.forEach(elem => {
                    burgers.push(elem.dataValues);
                });
                let hbsObject = {
                    burgers : burgers
                };
                console.log(hbsObject);
                res.render("index", hbsObject);
            });
    });

    // POST route for saving a new post
    app.post("/api/burgers", function (req, res) {
        console.log(req.body);
        db.Burger.create({
            name: req.body.name,
        })
            .then(function (dbBurger) {
                res.json(dbBurger);
            });
    });


    // PUT route for updating posts
    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBurger) {
                res.json(dbBurger);
            });
    });
};