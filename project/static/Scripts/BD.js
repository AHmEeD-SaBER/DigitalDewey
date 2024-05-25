const bookName = sessionStorage.getItem("name");
const bookImageSrc = sessionStorage.getItem("imageSrc");
const bookPrice = sessionStorage.getItem("price");
const bookAvailability = sessionStorage.getItem("availability");
const bookCategory = sessionStorage.getItem("category");
const bookAuthor = sessionStorage.getItem("author");
const bookDescription = sessionStorage.getItem("description");
const bookSection = sessionStorage.getItem("section");
const btn = document.getElementById("borrowButton");

// document.getElementById("name").textContent = bookName;
document.getElementById("image").src = bookImageSrc;
// document.getElementById("price").textContent = bookPrice;
// document.getElementById("availability").textContent = bookAvailability;
// document.getElementById("category").textContent = " - " + bookCategory;
// document.getElementById("author").textContent = "Written By " + bookAuthor;
// document.getElementById("description").textContent = bookDescription;[]
document.getElementById("readButton").textContent = "Read Now!";
// document.getElementById("")

const ionicon = document.getElementById("ionicon");
if (bookAvailability === "Available") {
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

let originalBookDetails = {};

function editBookDetails() {
    const textContainer = document.getElementById("text-container");
    originalBookDetails = {
        name: document.getElementById('name').textContent,
        author: document.getElementById('author').textContent,
        category: document.getElementById('category').textContent,
        price: document.getElementById('price').textContent,
        availability: document.getElementById('availability').textContent,
        description: document.getElementById('description').textContent,
    };

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
        let value = originalBookDetails[field];
        if (value && value[1] === '-') {
            console.log(value);
            value = value.substring(3);
        }
        input.value = value;
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
    });
  
    const saveButton = document.getElementById("saveButton");
    saveButton.style.display = "flex";
  
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.style.display = "flex";
    cancelButton.onclick = () => window.location.reload();
    form.appendChild(saveButton);
    form.appendChild(cancelButton);
    textContainer.innerHTML = "";
    textContainer.appendChild(form);
  
    document.getElementById("imageSrc-input").style.display = "none";
    document.getElementById("imageSrc-input-label").style.display = "none";
}

function isAdmin() {
    fetch('/auth/api/user/')
        .then(response => response.json())
        .then(data => {
            if (data.is_staff) {
                document.getElementById("delButton").style.display = "flex";
                document.getElementById("editButton").style.display = "flex";
            } else {
                document.getElementById("delButton").style.display = "none";
                document.getElementById("editButton").style.display = "none";
            }
        })
        .catch(error => console.error('Error fetching user info:', error));
}

async function isLoggedIn() {
    try {
        const response = await fetch('/auth/api/loggedin/');
        const data = await response.json();
        if (data.is_logged_in) {
            isAdmin();
            return true;
        } else {
            document.getElementById("delButton").style.display = "none";
            document.getElementById("editButton").style.display = "none";
            return false;
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

function loadFromLocalStorage(localStorageName) {
  const storedBooks = localStorage.getItem(localStorageName);
  return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveToLocalStorage(books, localStorageName) {
  localStorage.setItem(localStorageName, JSON.stringify(books));
}

function checkIfBorrowed() {
    const urlParts = window.location.pathname.split('/');
    const bookId = urlParts[urlParts.length - 2];
    fetch(`/Books/borrowed/${bookId}/`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                if(data.has_borrowed){
                    document.getElementById("borrowButton").style.display = "none";
                    document.getElementById("readButton").style.display = "inline-block";
                    document.getElementById("returnButton").style.display = "inline-block"
                } else {
                    document.getElementById("borrowButton").style.display = "inline-block";
                    document.getElementById("readButton").style.display = "none";
                    document.getElementById("returnButton").style.display = "none"
                }
            } else {
                console.error('Failed to check:', data.message);
            }
        })
        .catch(error => {
            console.error('Error checking if book has been borrowed:', error);
        });
}

document.getElementById("borrowButton").addEventListener("click", async function () {
    try {
        const response = await fetch('/auth/api/loggedin/');
        const data = await response.json();
        const urlParts = window.location.pathname.split('/');
        const bookId = urlParts[urlParts.length - 2];

        if (data.is_logged_in) {
            if (bookAvailability === 'Available') {
                borrowBook();
                isBorrowed = true;
              } else {
                addBook(bookName, bookPrice, bookImageSrc, bookAuthor, bookCategory, bookAvailability, bookDescription, "RequestedBooks");
                alert("Book Has Been Added To Requested Books List");
                isBorrowed = false;
              }
        } else {
            alert('Please Login First!');
            window.location.href = '/auth/login/';
            return;
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    } 
});

document.getElementById("readButton").addEventListener("click", async function () {
    try {
        const response = await fetch('/auth/api/loggedin/');
        const data = await response.json();
        if (data.is_logged_in) {
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
        } else {
            alert('Please Login First!');
            window.location.href = '/auth/login/';
            return;
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
});

function addBook(name,price,imageSrc,author,category,availability,description,localStorageName) {
    let Books = loadFromLocalStorage(localStorageName);

    const existingBookIndex = Books.findIndex((book) => book.name === name);
    if (existingBookIndex !== -1) {
        Books.splice(existingBookIndex, 1);
    }

    let urlParts = window.location.pathname.split('/');
    let id = urlParts[urlParts.length - 2];
    let book = {
        id: id,
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

document.getElementById("returnButton").addEventListener("click", function(){
    const urlParts = window.location.pathname.split('/');
    const bookId = urlParts[urlParts.length - 2];
    fetch(`/Books/return/${bookId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message);
            window.location.href = `/Book_Details/${bookId}/`;
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error returning the book:', error);
        alert('An error occurred while trying to return the book.');
    });
});

function borrowBook() {
    const urlParts = window.location.pathname.split('/');
    const bookId = urlParts[urlParts.length - 2];
    fetch(`/Books/borrow/${bookId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken':  getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            window.location.href = `/Book_Details/${bookId}/`;
        }
    })
    .catch(error => console.error('Error borrowing book:', error));
}

document.getElementById("editButton").addEventListener("click", function () {
    document.getElementById("editButton").style.display = "none";
    editBookDetails(); 
    });

document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage('RequestedBooks');
    initializeLocalStorage('ReadBooks');
    initializeLocalStorage('LastSeenBooks');
    addBook(bookName, bookPrice, bookImageSrc, bookAuthor, bookCategory, bookAvailability, bookDescription, "LastSeenBooks");
    
    isLoggedIn()

    const urlParts = window.location.pathname.split('/');
    const bookId = urlParts[urlParts.length - 2];
    checkIfBorrowed();

    document.getElementById('saveButton').addEventListener('click', function() {    
        const formData = new FormData();
        formData.append('title', document.getElementById('name-input').value);
        formData.append('author', document.getElementById('author-input').value);
        formData.append('category', document.getElementById('category-input').value);
        formData.append('price', document.getElementById('price-input').value);
        formData.append('availability', document.getElementById('availability-input').value);
        formData.append('description', document.getElementById('description-input').value);
        formData.append('section', document.getElementById('section-input').value);
    
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
                // alert('Book updated successfully');
            // Update the original book details with the new values
            originalBookDetails.name = document.getElementById('name-input').value;
            originalBookDetails.author = document.getElementById('author-input').value;
            originalBookDetails.category = document.getElementById('category-input').value;
            originalBookDetails.price = document.getElementById('price-input').value;
            originalBookDetails.availability = document.getElementById('availability-input').value;
            originalBookDetails.description = document.getElementById('description-input').value;

            // Update the book details on the page
            document.getElementById("text-container").innerHTML = `
                <h2 id="name" style="display: inline;">${originalBookDetails.name}</h2>
                <h3 id="category" style="display: inline;"> - ${originalBookDetails.category}</h3>
                <h4 id="author">${originalBookDetails.author}</h4>
                <p id="description">${originalBookDetails.description}</p>
                <br><br>
                <ion-icon id="ionicon" class="CheckIcon"></ion-icon>
                <span id="availability">${originalBookDetails.availability}</span>
                <h3 id="price">${originalBookDetails.price}</h3>`;
            const ionicon = document.getElementById("ionicon");
            if (originalBookDetails.availability === "Available") {
            ionicon.setAttribute("name", "checkmark-circle-outline");
            ionicon.classList.add("available");
            } else {
            ionicon.setAttribute("name", "close-circle-outline");
            ionicon.classList.add("unavailable");
            btn.textContent = "Request";
            }

            document.getElementById("text-container").offsetHeight;
            document.getElementById("editButton").style.display = "flex";
            if (editButton) {
                // editButton.addEventListener("click", function () {
                //     // document.getElementById("editButton").style.display = "none";
                //     editBookDetails();
                // });
            }
            } else {
                console.error('Failed to update book: ', data.error);
                alert('Failed to update book');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('delButton').addEventListener('click', function() {
        // editBookDetails()
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

    
});