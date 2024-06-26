function loadBooksFromLocalStorage(localStorageName) {
  const storedBooks = localStorage.getItem(localStorageName);
  if (storedBooks) {
    Books = JSON.parse(storedBooks);
    Books.reverse();
  }
  return Books;
}

function displayLastSeen(books) {
  const lastContainer = document.getElementById("lastContainer");
  lastContainer.innerHTML = "";

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title");

  const ionicon = document.createElement("ion-icon");
  ionicon.setAttribute("name", "time-outline");

  titleContainer.appendChild(ionicon);

  const h2Container = document.createElement("h2");
  h2Container.innerHTML = "Last Seen";

  const hr = document.createElement("hr");

  titleContainer.appendChild(h2Container);
  lastContainer.appendChild(titleContainer);
  lastContainer.appendChild(hr);

  for (let i = 0; i < Math.min(books.length, 5); i++) {
    const book = books[i];
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("Card");

    const bookCoverContainer = document.createElement("div");
    bookCoverContainer.classList.add("bookCover");
    bookCoverContainer.classList.add("lastCover");

    const cardLink = document.createElement("a");
    cardLink.setAttribute("href", `/Book_Details/${book.id}/`);

    const cardImg = document.createElement("img");
    cardImg.alt = `Cover of ${book.name}`;
    cardImg.setAttribute("src", book.imageSrc);
    cardImg.setAttribute("name", book.name);
    cardImg.setAttribute("price", book.price);
    cardImg.setAttribute("availability", book.availability);
    cardImg.setAttribute("category", book.category);
    cardImg.setAttribute("author", book.author);
    cardImg.setAttribute("description", book.description);
    console.log(book.imageSrc);

    cardLink.appendChild(cardImg);
    bookCoverContainer.appendChild(cardLink);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details");

    const detailsName = document.createElement("p");
    const detailsCate = document.createElement("p");
    const detailsAuth = document.createElement("p");
    const detailsDesc = document.createElement("p");
    const detailsAvail = document.createElement("p");
    const detailsPrice = document.createElement("p");

    const alertNoLastSeen = document.createElement("h2");
    if (book.length === 0) {
      alertNoLastSeen.textContent = "Go Browse Some Books";
    } else {
      alertNoLastSeen.textContent = "";
    }

    detailsName.textContent = `Name: ${book.name}`;
    detailsCate.textContent = `Category: ${book.category}`;
    detailsAuth.textContent = `Author: ${book.author}`;
    detailsDesc.textContent = `Description: ${book.description}`;
    detailsPrice.textContent = `Price: ${book.price}`;
    detailsAvail.textContent = `Availability: ${book.availability}`;

    detailsName.classList.add("detailsPtag");
    detailsCate.classList.add("detailsPtag");
    detailsAuth.classList.add("detailsPtag");
    detailsDesc.classList.add("detailsPtag");
    detailsPrice.classList.add("detailsPtag");
    detailsAvail.classList.add("detailsPtag");

    detailsContainer.appendChild(detailsName);
    detailsContainer.appendChild(detailsCate);
    detailsContainer.appendChild(detailsAuth);
    detailsContainer.appendChild(detailsDesc);
    detailsContainer.appendChild(detailsPrice);
    detailsContainer.appendChild(detailsAvail);

    const hr2 = document.createElement("hr");

    cardContainer.appendChild(bookCoverContainer);
    cardContainer.appendChild(detailsContainer);
    lastContainer.appendChild(cardContainer);
    lastContainer.appendChild(hr2);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const borrowedBooksCount = document.getElementById('borrowNum').innerHTML;

    document.getElementById("editProfileButton").addEventListener("click", function () {
    alert("Unfortuneatly there is no Edit Functionality Currently");
    });

    const latestBooks = loadBooksFromLocalStorage("LastSeenBooks");
    displayLastSeen(latestBooks);

    const readBooks = loadBooksFromLocalStorage("ReadBooks");
    document.getElementById("readNum").textContent = readBooks.length;

    const requestedBooks = loadBooksFromLocalStorage("ReadBooks").length;

    const pointsPerReadBook = 2.5;
    const pointsPerBorrowedBook = 3.5;
    const recentActivityBonus = latestBooks.length * 0.5;
    const requestedBooksBonus = 1.5

    const rp = 5 * ((readBooks.length * pointsPerReadBook) + (borrowedBooksCount * pointsPerBorrowedBook) + recentActivityBonus + (requestedBooks * requestedBooksBonus));
    document.getElementById("rewardPoints").textContent = rp;
});