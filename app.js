class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static displayBooks(){
        const StoredBooks = [
            {
            title: 'Book One', author: 'John Doe' ,isbn: '3434434'
            },
            {
            title: 'Book Two', author: 'Jane Doe', isbn: '45545'
            }
];
const books = StoredBooks;
books.forEach((book) => UI.addBookToList(book));
    }


static addBookToList(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = 
    `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
}

static deleteBook(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }

}

static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('form');
    container.insertBefore(div,form);

    setTimeout(() => document.querySelector('.alert').remove(),3000);

}
static clearfields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';

}
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem(book) === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify('books'));

    }

   static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(books.isbn === isbn){
               books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSONbooks);
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

if(title === '' || author === '' || isbn === ''){
    UI.showAlert('please fill all the fields','danger');
}else{

const book = new Book(title, author, isbn);
UI.addBookToList(book);
UI.showAlert('Book Added Successfully','success');
UI.clearfields();
}
});

document.querySelector('#book-list').addEventListener('click', (e) =>
{
    UI.deleteBook(e.target);
    UI.showAlert('Book Deleted','success');
});
