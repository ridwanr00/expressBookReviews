const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", async (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res.status(200).json({
        message: "User successfully registered. Now you can login",
        data: { username, password },
      });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
// Task 1
// public_users.get("/", function async(req, res) {
//   //Write your code here
//   return res.status(200).json({ message: "Success", data: books });
// });
// Task 10
public_users.get("/", async (req, res) => {
  try {
    // Example of fetching data from an external source using Axios
    const response = await axios.get(
      "https://ridwanr00.github.io/expressBookReviews/db.json"
    );
    const books = response.data;

    return res.status(200).json({ message: "Success", data: books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   if (books[isbn]) {
//     return res.status(200).json({ message: "Success", data: books[isbn] });
//   } else {
//     return res
//       .status(404)
//       .json({ message: `Book with ISBN ${isbn} is not found.` });
//   }
// });
//Task 11

public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    // Example of fetching book data using Axios
    const response = await axios.get(
      `https://ridwanr00.github.io/expressBookReviews/db.json`
    );
    const book = response.data;

    if (book) {
      return res.status(200).json({ message: "Success", data: book[isbn] });
    } else {
      return res
        .status(404)
        .json({ message: `Book with ISBN ${isbn} is not found.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching book data", error: error.message });
  }
});

// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   let booksList = [];
//   for (let x in books) {
//     if (books[x].author === author) {
//       booksList.push(books[x]);
//     }
//   }
//   if (booksList.length > 0) {
//     return res.status(200).json({ message: "Success", data: booksList });
//   } else {
//     return res
//       .status(404)
//       .json({ message: `Book with author ${author} is not found.` });
//   }
// });
// Task 12
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author;

  try {
    const response = await axios.get(
      `https://ridwanr00.github.io/expressBookReviews/db.json`
    );
    const books = response.data;

    // Assuming books is an in-memory object or an array
    let booksList = [];

    // Simulating an asynchronous operation, e.g., fetching from a database
    for (let x in books) {
      if (books[x].author === author) {
        booksList.push(books[x]);
      }
    }

    if (booksList.length > 0) {
      return res.status(200).json({ message: "Success", data: booksList });
    } else {
      return res
        .status(404)
        .json({ message: `Books by author ${author} not found.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching books data", error: error.message });
  }
});

// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   let booksList = [];
//   for (let x in books) {
//     if (books[x].title === title) {
//       booksList.push(books[x]);
//     }
//   }
//   if (booksList.length > 0) {
//     return res.status(200).json({ message: "Success", data: booksList });
//   } else {
//     return res
//       .status(404)
//       .json({ message: `Book with title ${title} is not found.` });
//   }
// });
// Task 13
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const response = await axios.get(
      `https://ridwanr00.github.io/expressBookReviews/db.json`
    );
    const books = response.data;

    // Assuming books is an in-memory object or an array
    let booksList = [];

    // Simulating an asynchronous operation, e.g., fetching from a database
    for (let x in books) {
      if (books[x].title === title) {
        booksList.push(books[x]);
      }
    }

    if (booksList.length > 0) {
      return res.status(200).json({ message: "Success", data: booksList });
    } else {
      return res
        .status(404)
        .json({ message: `Books by author ${title} not found.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching books data", error: error.message });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res
      .status(200)
      .json({ message: "Success", data: books[isbn].review });
  } else {
    return res
      .status(404)
      .json({ message: `Book review with ISBN ${isbn} is not found.` });
  }
});

module.exports.general = public_users;
