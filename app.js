const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bhavanikoduru488:obTV97CXvL4gK9jF@todoapp.gq2zjlv.mongodb.net/ToDo')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection arror:",err));


const trySchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model('Task', trySchema);
const todo = new Item({
    name: "Welcome to your todo list"
});


app.get("/", function (_, res) {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something went wrong.");
        });
});

app.post("/", function (req, res) {
    const ItemName = req.body.ele1;
    const todo = new Item({
        name: ItemName
    });
    todo.save();
    res.redirect("/");
});

app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(checked);
        console.log("Deleted item with ID:", checked);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Error deleting item");
    }
});


app.listen(8000, function () {
    console.log("Server is running on port http://localhost:8000");
});