function displayNoBooksFound() {
  const container = document.getElementById("library-container");
  container.innerHTML =
    '<p class="nobooks">No books found that match your search criteria.</p>';
}

var originalContent = document.getElementById('library-container').innerHTML;

function updatePage(books) {
    books = JSON.parse(books);
    
    var libraryContainer = document.getElementById('library-container');

    const header = document.createElement("h2");
    header.classList.add("section-header");
    
    var section = document.createElement('section');
    section.className = 'category-section';
    libraryContainer.innerHTML = '';

    for (var book of books) {
        if (book.fields) {
            
            var bookDiv = document.createElement('div');
            bookDiv.className = 'book-div Card';
            
            var bookImage = document.createElement('img');
            bookImage.src = book.fields.cover;
            bookImage.width = 180;
            bookImage.height = 230;
            bookImage.name = book.fields.title;
            bookImage.setAttribute('author', book.fields.author);
            bookImage.setAttribute('category', book.fields.category);
            bookImage.setAttribute('description', book.fields.description);
            bookImage.setAttribute('availability', book.fields.available);
            bookImage.setAttribute('price', book.fields.price);                 
            bookImage.className = 'book-image';

            // header.textContent = book.fields.category;
            
            var bookLink = document.createElement('a');
            bookLink.href = "/Book_Details/" + book.pk + "/";
            bookLink.className = 'link-class';
            bookLink.appendChild(bookImage);
            bookDiv.appendChild(bookLink);

            var bookTitle = document.createElement('h3');
            bookTitle.className = 'book-name';
            bookTitle.textContent = book.fields.title;
            bookDiv.appendChild(bookTitle);

            var bookAuthor = document.createElement('p');
            bookAuthor.className = 'book-author';
            bookAuthor.textContent = book.fields.author;
            bookDiv.appendChild(bookAuthor);

            var bookAvailability = document.createElement('p');
            bookAvailability.textContent = book.fields.available
            if(book.fields.available === 'Available'){
                bookAvailability.className = 'available-true';
            } else {
                bookAvailability.className = 'available-false';
            }
            bookDiv.appendChild(bookAvailability);

            section.appendChild(bookDiv);
            libraryContainer.appendChild(header);
            libraryContainer.appendChild(section);
        }
    }
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        setTimeout(() => {
            const elementPos = element.getBoundingClientRect().top;
            window.scrollBy({
                top: elementPos - 120,
                behavior: 'smooth'
            });
        }, 0);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const availableCheckbox = document.getElementById('available-only-checkbox');
    function fetchBooks() {
        const query = searchInput.value.trim();
        const available = availableCheckbox.checked;
        const url = `/Books/avail-search?query=${encodeURIComponent(query)}&available=${available}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data === '[]'){
                    document.getElementById('library-container').innerHTML ='<p class="nobooks">No books found that match your search criteria.</p>';
                } else {
                    updatePage(data);
                }
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    searchInput.addEventListener('input', fetchBooks);
    availableCheckbox.addEventListener('change', fetchBooks);
    scrollToHash();
});