
// function deleteBookFromLibrary(bookName, localStorageName = "LibraryBooks") {
//   let books = loadFromLocalStorage(localStorageName);

//   const index = books.findIndex((book) => book.name === bookName);
//   if (index !== -1) {
//     books.splice(index, 1);
//     saveToLocalStorage(books, localStorageName);
//     alert(`Book deleted: ${bookName}`);
//     window.location.href = "../HTML/index.html";
//   } else {
//     alert("Book not found");
//   }
// }

// function borrowBookFunc() {
//   // borrowing system
//   if (bookAvailability === "Available") {
//     document.getElementById("borrowButton").textContent = "Borrow";
//   } else {
//     document.getElementById("borrowButton").textContent = "Request";
//   }

//   document.getElementById("readButton").textContent = "Read Now!";
// }

// function rmvDupesInLocalStorage(localStorageName) {
//   let books = loadFromLocalStorage(localStorageName);
//   const seenBooks = new Set();
//   const uniqueBooks = [];

//   books.forEach((book) => {
//     if (!seenBooks.has(book.name)) {
//       seenBooks.add(book.name);
//       uniqueBooks.push(book);
//     } else {
//       console.log("Duplicate found and removed:", book.name);
//     }
//   });
//   saveToLocalStorage(uniqueBooks, localStorageName);
// }

// function isBookBorrowed(bookName) {
//   let borrowedBooks = loadFromLocalStorage("BorrowedBooks");
//   return borrowedBooks.some((book) => book.name === bookName);
// }

// let isBorrowed = false;

// hideOrShowButton();
// borrowBookFunc();

// function saveBookDetails() {
//   const form = document.getElementById("editForm");
//   const formData = new FormData(form);
//   const updatedBook = {};

//   formData.forEach((value, key) => {
//     updatedBook[key] = value;
//   });

//   const books = loadFromLocalStorage("LibraryBooks");
//   const bookIndex = books.findIndex(
//     (book) => book.name === sessionStorage.getItem("name")
//   );
//   if (bookIndex !== -1) {
//     books.splice(bookIndex, 1);
//     books.push(updatedBook);
//     saveToLocalStorage(books, "LibraryBooks");
//     alert("Book details updated successfully!");
//     window.location.href = "../HTML/index.html";
//   } else {
//     alert("Book not found.");
//   }
//   let img = document.getElementById("image");
//   img.setAttribute("src", "../Imgs/Books/(43).jpg");
// }

document.addEventListener("DOMContentLoaded", function () {
//   rmvDupesInLocalStorage("LastSeenBooks");
//   const bookIsBorrowed = isBookBorrowed(bookName);
//   if (bookIsBorrowed) {
//     document.getElementById("borrowButton").style.display = "none";
//     document.getElementById("readButton").style.display = "inline-block";
//   } else {
//     document.getElementById("borrowButton").style.display = "inline-block";
//     document.getElementById("readButton").style.display = "none";
//   }
//   const delButton = document.getElementById("delButton");
//   if (delButton) {
//     delButton.addEventListener("click", () => {
//       const bookName = sessionStorage.getItem("name");
//       deleteBookFromLibrary(bookName);
//     });
//   }
});
