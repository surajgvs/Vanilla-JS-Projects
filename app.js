class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  // UI Class
  class UI {
    static displayBooks() {
      // Show the spinner before loading
      document.querySelector('.spinner').style.display = 'block';
  
      // Simulate loading delay
      setTimeout(() => {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
  
        // Hide the spinner after loading
        document.querySelector('.spinner').style.display = 'none';
      }, 1000); // Simulate a delay of 1 second
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
        Store.removeBook(el.parentElement.previousElementSibling.textContent);
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  
    static validateForm(title, author, isbn) {
      let isValid = true;
  
      // Validate Title
      if (title === '') {
        document.querySelector('#title').classList.add('is-invalid');
        isValid = false;
      } else {
        document.querySelector('#title').classList.remove('is-invalid');
        document.querySelector('#title').classList.add('is-valid');
      }
  
      // Validate Author
      if (author === '') {
        document.querySelector('#author').classList.add('is-invalid');
        isValid = false;
      } else {
        document.querySelector('#author').classList.remove('is-invalid');
        document.querySelector('#author').classList.add('is-valid');
      }
  
      // Validate ISBN
      if (isbn === '') {
        document.querySelector('#isbn').classList.add('is-invalid');
        isValid = false;
      } else {
        document.querySelector('#isbn').classList.remove('is-invalid');
        document.querySelector('#isbn').classList.add('is-valid');
      }
  
      return isValid;
    }
  }
  
  // Store Class
  class Store {
    static getBooks() {
      let books;
      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
      const updatedBooks = books.filter((book) => book.isbn !== isbn);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
  
    if (UI.validateForm(title, author, isbn)) {
      const book = new Book(title, author, isbn);
      UI.addBookToList(book);
      Store.addBook(book);
      UI.showAlert('Book Added Successfully', 'success');
      UI.clearFields();
    } else {
      UI.showAlert('Please fill in all fields correctly', 'danger');
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book Removed', 'success');
  });