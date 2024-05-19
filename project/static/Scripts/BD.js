const bookName = sessionStorage.getItem("name");
const bookImageSrc = sessionStorage.getItem("imageSrc");
const bookPrice = sessionStorage.getItem("price");
const bookAvailability = sessionStorage.getItem("availability");
const bookCategory = sessionStorage.getItem("category");
const bookAuthor = sessionStorage.getItem("author");
const bookDescription = sessionStorage.getItem("description");
const bookSection = sessionStorage.getItem("section");
const btn = document.getElementById("borrowButton");

document.getElementById("name").textContent = bookName;
document.getElementById("image").src = bookImageSrc;
document.getElementById("price").textContent = bookPrice;
document.getElementById("availability").textContent = bookAvailability ==="True" ?"Available" : "Unavailable";
document.getElementById("category").textContent = " - " + bookCategory;
document.getElementById("author").textContent = "Written By " + bookAuthor;
document.getElementById("description").textContent = bookDescription;
document.getElementById("readButton").textContent = "Read Now!";

const ionicon = document.getElementById("ionicon");
if (bookAvailability === "True") {
  ionicon.setAttribute("name", "checkmark-circle-outline");
  ionicon.classList.add("available");
} else {
  ionicon.setAttribute("name", "close-circle-outline");
  ionicon.classList.add("unavailable");
  btn.textContent = "Request";
}

document.body.style.backgroundImage = "url('" + bookImageSrc + "')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";

function editBookDetails() {
    const textContainer = document.getElementById("text-container");
    textContainer.innerHTML = "";

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fields = ["name","author","category","price","availability","description","section","imageSrc",];
    const form = document.createElement("form");
    form.id = "editForm";
  
    fields.forEach((field) => {
      const label = document.createElement("label");
      label.htmlFor = `${field}-input`;
      label.textContent = `${capitalize(field)}: `;
      label.id = `${field}-input-label`;
      const input = document.createElement(
        field === "description" ? "textarea" : "input"
      );
      input.id = `${field}-input`;
      input.name = field;
      input.value = sessionStorage.getItem(field);
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
    });
  
    const saveButton = document.getElementById("saveButton");
  //   saveButton.onclick = saveBookDetails;
    saveButton.style.display = "flex";
  
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.style.display = "flex";
    cancelButton.onclick = () => window.location.reload();
    form.appendChild(saveButton);
    form.appendChild(cancelButton);
    textContainer.appendChild(form);
  
    document.getElementById("imageSrc-input").style.display = "none";
    document.getElementById("imageSrc-input-label").style.display = "none";
    document.getElementById("editButton").disabled = true;
}

function checkIsAdmin() {
    
}

function hideOrShowButton() {
    let isAdmin = true;
  
    if (isAdmin == true) {
      document.getElementById("delButton").style.display = "flex";
      document.getElementById("editButton").style.display = "flex";
    } else {
      document.getElementById("delButton").style.display = "none";
      document.getElementById("editButton").style.display = "none";
    }
}

function loadFromLocalStorage(localStorageName) {
  const storedBooks = localStorage.getItem(localStorageName);
  return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveToLocalStorage(books, localStorageName) {
  localStorage.setItem(localStorageName, JSON.stringify(books));
}

function isBorrowedfunc() {
    if (isBorrowed) {
      document.getElementById("borrowButton").style.display = "none";
      document.getElementById("readButton").style.display = "inline-block";
    } else {
      document.getElementById("borrowButton").style.display = "inline-block";
      document.getElementById("readButton").style.display = "none";
    }
}

function isBookBorrowed(bookName) {
  let borrowedBooks = loadFromLocalStorage("BorrowedBooks");
  return borrowedBooks.some((book) => book.name === bookName);
}

let isBorrowed = false;

document.getElementById("borrowButton").addEventListener("click", function () {
    const isLoggedIn = true;
    if(!isLoggedIn) {
        alert('Please Login First!');
        // window.location.href = window.location.href = "{% url 'authentication:Login' %}";
        return;
    } else {
        console.log(bookAvailability)
        if (bookAvailability === 'True') {
            addBook(bookName, bookPrice, bookImageSrc, bookAuthor, bookCategory, bookAvailability, bookDescription, "BorrowedBooks");

            // rmvDupesInLocalStorage("BorrowedBooks");
            alert("Book Has Been Added To Borrowed Books List");
            isBorrowed = true;
          } else {
            addBook(bookName, bookPrice, bookImageSrc, bookAuthor, bookCategory, bookAvailability, bookDescription, "RequestedBooks");
            alert("Book Has Been Added To Requested Books List");
            isBorrowed = false;
          }
          isBorrowedfunc();
    }
});

document.getElementById("readButton").addEventListener("click", function () {
    const isLoggedIn = true
    if(!isLoggedIn) {
        alert('Please Login First!');
        window.location.href = "{% url 'authentication:Login' %}";
        return;
    } else {
        addBook(
            bookName,
            bookPrice,
            bookImageSrc,
            bookAuthor,
            bookCategory,
            bookAvailability,
            bookDescription,
            "ReadBooks"
          );
        // rmvDupesInLocalStorage("ReadBooks");
        alert("Book Added To Read List But No Book Reading Functionality Yet!! SRY");
    }
});

function addBook(name,price,imageSrc,author,category,availability,description,localStorageName) {
    let Books = loadFromLocalStorage(localStorageName);

    const existingBookIndex = Books.findIndex((book) => book.name === name);
    if (existingBookIndex !== -1) {
        Books.splice(existingBookIndex, 1);
    }
    let book = {
        name: name,
        price: price,
        imageSrc: imageSrc,
        author: author,
        category: category,
        availability: availability,
        description: description,
    };

    Books.push(book);
    saveToLocalStorage(Books, localStorageName);
}

function initializeLocalStorage(key) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([]));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage('RequestedBooks');
    initializeLocalStorage('ReadBooks');
    initializeLocalStorage('BorrowedBooks');
    initializeLocalStorage('LastSeenBooks');
    addBook(bookName, bookPrice, bookImageSrc, bookAuthor, bookCategory, bookAvailability, bookDescription, "LastSeenBooks");

    hideOrShowButton();
    console.log('mewo')

    const bookIsBorrowed = isBookBorrowed(bookName);
    if (bookIsBorrowed) {
        document.getElementById("borrowButton").style.display = "none";
        document.getElementById("readButton").style.display = "inline-block";
    } else {
        document.getElementById("borrowButton").style.display = "inline-block";
        document.getElementById("readButton").style.display = "none";
    }

    const editButton = document.getElementById("editButton");
    if (editButton) {
        editButton.addEventListener("click", function () {
        document.getElementById("editButton").style.display = "none";
        editBookDetails();
        });
    }

    const urlParts = window.location.pathname.split('/');
    const bookId = urlParts[urlParts.length - 2];

    document.getElementById('saveButton').addEventListener('click', function() {    
        const formData = new FormData();
        formData.append('title', document.getElementById('name-input').value);
        formData.append('author', document.getElementById('author-input').value);
        formData.append('category', document.getElementById('category-input').value);
        formData.append('price', document.getElementById('price-input').value);
        formData.append('availability', document.getElementById('availability-input').value === "Available");
        formData.append('description', document.getElementById('description-input').value);
    
        fetch(`/Books/edit/${bookId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Book updated successfully');
                window.location.href = '/';
            } else {
                console.error('Failed to update book: ', data.error);
                alert('Failed to update book');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('delButton').addEventListener('click', function() {
        fetch(`/Books/delete/${bookId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert('Book deleted successfully');
                window.location.href = '/';
            } else {
                alert('Error deleting book');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});