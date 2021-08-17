/* GLOBAL VARIABLES */

const form = document.getElementById('book-form');
const table = document.getElementById('library-table');

const bookAttribute = 'data-id'; // For associating DOM elements to books
const myLibrary = [];

/* SETUP */

setup();

/* FUNCTIONS */

/**
 * Sets up the library.
 */
function setup() {
    form.addEventListener('submit', addBookToLibrary);

    displayBooks();
}

/**
 * A constructor for a Book object.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {boolean} read - Whether the book has been read.
 */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const readStr = (read) ? 'read' : 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${readStr}`;
    }
}

/**
 * Iterates through the library and displays each stored book in the table.
 */
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        createBookRow(i);
    }
}

/**
 * Adds a new book to the library through a form submission. Updates the display
 * with the new book.
 *
 * @param {Event} event - The event that occurred.
 */
function addBookToLibrary(event) {
    const formData = new FormData(event.target);

    myLibrary.push(new Book(formData.get('title'),
            formData.get('author'),
            formData.get('pages'),
            formData.get('read')));

    createBookRow(myLibrary.length - 1);

    // Stop page from refreshing and clear the form
    event.preventDefault();
    form.reset();
}

/**
 * Creates a new row in the library's table for a library book at the given
 * index. Fills the row with the book's information.
 *
 * @param {number} index - The index of the book in the library to create a row for.
 */
function createBookRow(index) {
    const newRow = document.createElement('tr');
    newRow.setAttribute(bookAttribute, index);

    const titleData = document.createElement('td');
    titleData.textContent = `${myLibrary[index].title}`;
    const authorData = document.createElement('td');
    authorData.textContent = `${myLibrary[index].author}`;
    const pagesData = document.createElement('td');
    pagesData.textContent = `${myLibrary[index].pages}`;
    const readData = document.createElement('td');
    myLibrary[index].read ? readData.classList.add('read')
            : readData.classList.add('unread');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('del-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteBookFromLibrary);

    newRow.appendChild(titleData);
    newRow.appendChild(authorData);
    newRow.appendChild(pagesData);
    newRow.appendChild(readData);
    newRow.appendChild(deleteBtn);

    table.appendChild(newRow);
}

/**
 * Deletes a given book from the table and the library using the row's data
 * attribute.
 *
 * @param {Event} event - The event that occurred.
 */
function deleteBookFromLibrary(event) {
    const bookRow = event.target.parentElement;
    const bookId = bookRow.getAttribute(bookAttribute);

    table.removeChild(bookRow);
    myLibrary.splice(bookId, 1);
}
