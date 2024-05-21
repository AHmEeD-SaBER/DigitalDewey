function displayNoBooksFound() {
  const container = document.getElementById("library-container");
  container.innerHTML =
    '<p class="nobooks">No books found that match your search criteria.</p>';
}

// function groupBooksByCategory(books) {
//   if (!books || !Array.isArray(books)) {
//     console.error("books is undefined or not an array:", books);
//     return {};
//   }
//   const booksByCategory = books.reduce((acc, book) => {
//     if (!acc[book.category]) {
//       acc[book.category] = [];
//     }
//     acc[book.category].push(book);
//     return acc;
//   }, {});

//   for (const category in booksByCategory) {
//     booksByCategory[category].sort((a, b) => a.name.localeCompare(b.title));
//   }
//   const sortedCategories = Object.keys(booksByCategory)
//     .sort()
//     .reduce((acc, key) => ({ ...acc, [key]: booksByCategory[key] }), {});

//   return sortedCategories;
// }

function displayCategorySlider() {
  const categories = Object.keys(groupBooksByCategory(library));

  const categorySliderContainer = document.getElementById(
    "categories_sliderz_container"
  );
  categorySliderContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "chevron_left";
  prevButton.id = "prev";
  prevButton.classList.add("slider_Button", "material-symbols-rounded");
  prevButton.setAttribute('onclick', 'initiateswipe()');

  categorySliderContainer.appendChild(prevButton);

  const categoriesList = document.createElement("ul");
  categoriesList.classList.add("slider", "categories");

  categories.forEach((category) => {
    const categoryLi = document.createElement("li");
    const categoryLink = document.createElement("a");
    categoryLink.href = `#${category}`;
    categoryLink.textContent = category;
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault();
      filterBooksByCategory(category);
    });
    categoryLi.appendChild(categoryLink);
    categoriesList.appendChild(categoryLi);
  });

  categorySliderContainer.appendChild(categoriesList);

  const nextButton = document.createElement("button");
  nextButton.textContent = "chevron_right";
  nextButton.id = "next";
  nextButton.classList.add("slider_Button", "material-symbols-rounded");
  nextButton.setAttribute('onclick', 'initiateswipe()');

  categorySliderContainer.appendChild(nextButton);
}

// function displayBooksByCategory(booksByCategory) {
//   const container = document.getElementById("library-container");
//   container.innerHTML = "";

//   for (const [category, books] of Object.entries(booksByCategory)) {
//     const section = document.createElement("section");
//     section.classList.add("category-section");
//     section.setAttribute("id", category);

//     const header = document.createElement("h2");
//     header.textContent = category;
//     header.classList.add("section-header");
//     container.appendChild(header);

//     books.forEach((book) => {
//       const bookElement = document.createElement("div");
//       bookElement.classList.add("book-div");
//       bookElement.classList.add("Card");

//       let varAvailable;
//       if (book.available) {
//         varAvailable = "Available";
//       } else {
//         varAvailable = "Unavailable";
//       }

//       const img = document.createElement("img");
//       img.src = book.imageSrc;
//       img.alt = `Cover of ${book.title}`;
//       img.setAttribute("name", book.title);
//       img.setAttribute("price", book.price);
//       img.setAttribute("availability", varAvailable);
//       img.setAttribute("category", book.category);
//       img.setAttribute("author", book.author);
//       img.setAttribute("description", book.description);

//       img.classList.add("book-image");

//       const link = document.createElement("a");
//       link.href = `Book-Details.html?name=${encodeURIComponent(
//         book.title
//       )}&price=${encodeURIComponent(book.price)}`;
//       link.classList.add("link-class");

//       link.appendChild(img);
//       bookElement.appendChild(link);

//       const bookName = document.createElement("h3");
//       bookName.textContent = book.title;
//       bookName.classList.add("book-name");
//       bookElement.appendChild(bookName);

//       const bookAuthor = document.createElement("p");
//       bookAuthor.textContent = `Author: ${book.author}`;
//       bookAuthor.classList.add("book-author");
//       bookElement.appendChild(bookAuthor);

//       const bookAvailability = document.createElement("p");
//       bookAvailability.textContent = ` ${
//         book.available ? "Available" : "Unavailable"
//       }`;
//       if (book.available) {
//         bookAvailability.classList.add("available-true");
//       } else {
//         bookAvailability.classList.add("available-false");
//       }
//       bookElement.appendChild(bookAvailability);

//       section.appendChild(bookElement);
//     });
//     container.appendChild(section);
//   }
// }



// function filterBooksByCategory(selectedCategory) {
//   const searchText = document
//     .getElementById("search-input")
//     .value.toLowerCase();
//   const showAvailableOnly = document.getElementById(
//     "available-only-checkbox"
//   ).checked;

//   let filteredBooks = library.filter(
//     (book) =>
//       book.category === selectedCategory &&
//       (!searchText ||
//         book.title.toLowerCase().includes(searchText) ||
//         book.author.toLowerCase().includes(searchText) ||
//         book.category.toLowerCase().includes(searchText)) &&
//       (!showAvailableOnly || book.availability)
//   );

//   if (filteredBooks.length === 0) {
//     displayNoBooksFound();
//   } else {
//     displayBooksByCategory(groupBooksByCategory(filteredBooks));
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  displayCategorySlider();
  // initiateswipe();
 
  scrollToHash();
});
