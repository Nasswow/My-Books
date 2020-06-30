require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");
const Book = require("./models/book");

//Starting the Server by initiating express
const app = express();

//Load view Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Bring env variables
let db = process.env.DB_CONNECT;
let port = process.env.PORT;

//Connect to database
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Successfully connected to the Database");
  }
);
//Home route
app.get("/", (req, res) => {
  res.render("signin");
});
app.post("/", (req, res) => {
  if (process.env.PASSWORD === req.body.password) {
    res.redirect("/home");
  } else {
    res.render("signerr");
  }
});

app.get("/home", (req, res) => {
  res.render("home");
});
//Handle get request to home route
app.get("/books", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "List of Books",
        books: books,
      });
    }
  });
});
//Get single article
app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    res.render("books", {
      book: book,
    });
  });
});
//Handle get request to Add route
app.get("/add", (req, res) => {
  res.render("add_book", {
    title: "Add New Book",
  });
});

//Handle submit POST route
app.post("/add", (req, res) => {
  let book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.body = req.body.body;

  book.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});
// Load Edit form
app.get("/books/edit/:id", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    res.render("edit_book", {
      title: "Edit Your Book",
      book: book,
    });
  });
});
//Handle submit POST route
app.post("/books/edit/:id", (req, res) => {
  let book = {};
  book.title = req.body.title;
  book.author = req.body.author;
  book.body = req.body.body;
  let query = { _id: req.params.id };
  Book.update(query, book, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});

app.delete("/books/:id", (req, res) => {
  let query = { _id: req.params.id };
  Book.remove(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
});

//Listning to port
app.listen(port, () => console.log(`Server started on port ${port} ...`));
