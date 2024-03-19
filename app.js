const myLibrary = [];
const formTitleInput = document.getElementById('title');
const formAuthorInput = document.getElementById('author');
const formPagesInput = document.getElementById('pages');
const targetElement = document.getElementById('targetElement');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function openAddingForm() {
    document.getElementById('add-book-form-container').style.display = 'flex';
}

function deleteBook(book) {
    let index = myLibrary.findIndex(item => item === book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        showBooks();
    }
}

function submitAddingBook() {
    let title = formTitleInput.value.trim();
    let author = formAuthorInput.value.trim();
    let pages = formPagesInput.value.trim();

    if (title === '' || author === '') {
        alert("Title and author cannot be empty!");
        return;
    }

    if (!isNaN(pages) && parseInt(pages) <= 10) {
        alert("Pages should be a number greater than 10!");
        return;
    }

    let book = new Book(title, author, pages);
    myLibrary.push(book);
    cancelAddingBook();
    showBooks();

    // Save the last added book to localStorage
    localStorage.setItem('lastAddedBook', JSON.stringify(book));

    formTitleInput.value = '';
    formAuthorInput.value = '';
    formPagesInput.value = '';
}

function cancelAddingBook() {
    document.getElementById('add-book-form-container').style.display = 'none';
}

function readedButtonText(readedCell) {
    if (readedCell.textContent === 'NO') {
        readedCell.textContent = 'YES';
    } else {
        readedCell.textContent = 'NO';
    }
}

function slideToggle(readedCell) {
    readedCell.style.display = 'block';
    readedCell.style.margin = '5px auto';
    readedCell.style.padding = '10px 10px';
    readedCell.style.border = 'none';
    readedCell.style.borderRadius = '5px';
    readedCell.style.backgroundColor = '#dcd935';
    readedCell.style.color = 'white';
    readedCell.style.cursor = 'pointer';
    readedCell.addEventListener('mouseenter', () => {
        readedCell.style.backgroundColor = '#c7c430';
        readedCell.style.transition = 'background-color 0.3s ease';
    }); 
    readedCell.addEventListener('mouseleave', () => {
        readedCell.style.backgroundColor = '#dcd935';
        readedCell.style.transition = 'background-color 0.3s ease';
    });
}


function showBooks() {
    let booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('books-table');

    const headersRow = document.createElement('tr');
    headersRow.classList.add('header-row');

    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Title';
    headersRow.appendChild(titleHeader);

    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'Author';
    headersRow.appendChild(authorHeader);

    const pageHeader = document.createElement('th');
    pageHeader.textContent = 'Pages';
    headersRow.appendChild(pageHeader);

    const deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Delete';
    headersRow.appendChild(deleteHeader);

    const readedHeader = document.createElement('th');
    readedHeader.textContent = 'Readed';
    headersRow.appendChild(readedHeader);

    table.appendChild(headersRow);

    myLibrary.forEach(book => {
        const bookRow = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        bookRow.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        bookRow.appendChild(authorCell);

        const pageCell = document.createElement('td');
        pageCell.textContent = book.pages ? book.pages : 'N/A';
        bookRow.appendChild(pageCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn-delete');
        deleteButton.addEventListener('click', () => deleteBook(book));
        deleteCell.appendChild(deleteButton);
        bookRow.appendChild(deleteCell);

        const readedCell = document.createElement('td');
        const readedButton = document.createElement('button');
        readedButton.textContent = 'NO';
        readedButton.classList.add('btn-readed');
        readedButton.addEventListener('click', () => { 
            slideToggle(readedButton);
            readedButtonText(readedButton);
        });
        readedCell.appendChild(readedButton);
        bookRow.appendChild(readedCell);

        table.appendChild(bookRow);
    });

    booksContainer.appendChild(table);
}

window.addEventListener('load', () => {
    const lastAddedBook = JSON.parse(localStorage.getItem('lastAddedBook'));
    if (lastAddedBook) {
        myLibrary.push(lastAddedBook);
        showBooks();
    }
});

showBooks();