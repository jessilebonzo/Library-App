document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('bookForm');

  // Retrieve stored books from local storage
  let books = JSON.parse(localStorage.getItem('books')) || [];

  // Function to display books
  function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.textContent = book.title;
      bookList.appendChild(bookItem);
    });
  }

  // Function to add a book
  function addBook(title, author, genre, quote, pages, imgURL, read) {
    const newBook = {
      title: title,
      author: author,
      genre: genre,
      quote: quote,
      pages: pages,
      imgURL: imgURL,
      read: read
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  }

  // Event listener for form submission
  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const quote = document.getElementById('quote').value;
    const pages = document.getElementById('pages').value;
    const imgURL = document.getElementById('img-url').value;
    const read = document.getElementById('read').checked;

    addBook(title, author, genre, quote, pages, imgURL, read);

    // Reset form fields after submission
    bookForm.reset();
  });

  // Initial display
  displayBooks();
});

function Book(title, author, genre, quote, pages) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.quote = quote;
	this.pages = pages;
}

let books = [];

// Modal form input fields
const title = document.getElementById('title');
const author = document.getElementById('author');
const genre = document.getElementById('genre');
const quote = document.getElementById('quote');
const pages = document.getElementById('pages');
const imgURL = document.getElementById('img-url');
const readCheckbox = document.getElementById('read');

// All buttons
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const submit = document.querySelector('.modal form button');

const modal = document.querySelector('.modal');

const grid = document.querySelector('.bookshelf .grid');

// Hide or close modal
openModal.addEventListener('click', () => {
	modal.style.display = 'flex';
})

closeModal.addEventListener('click', () => {
	modal.style.display = 'none';
})

// add book to bookshelf
submit.addEventListener('click', (e) => {
	e.preventDefault()
	const book = new Book(title.value, author.value, genre.value, quote.value, pages.value);
	books.push(book);

	if (title.value && author.value && genre.value && quote.value && pages.value) {
		// Creating card
		const card = document.createElement('div');
		card.classList.add('card');
		card.style.backgroundImage = imgURL.value ? `url(${imgURL.value})` : "url('imgs/book.svg')";

		const bookDetails = document.createElement('div');
		bookDetails.classList.add('book-details');
		bookDetails.innerHTML = `
			<div>
				<p>${book.title}</p>
				<p>${book.author}</p>
				<p>${book.genre}</p>
				<p>${book.quote}</p>
				<p>${book.pages}</p>
			</div>
			<div class="read">
				<input type="checkbox" ${readCheckbox.checked ? "checked" : ""}>
				<label>Read</label>
			</div>
		`;

		card.appendChild(bookDetails);
		grid.appendChild(card);
		
		// Close modal
		modal.style.display = 'none';

		// Emptify form
		title.value = "";
		author.value = "";
		genre.value = "";
		quote.value = "";
		pages.value = "";
		imgURL.value = "";
		readCheckbox.checked = false;

	}
})
