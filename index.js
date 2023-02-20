/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { DateTime } from './node_modules/luxon/src/luxon.js';
import {
  addBookForm, BookListPage, Contact, Book,
} from './modules/index.js';

const main = document.querySelector('.main');
const navLinkContainer = document.querySelector('nav ul');
const dateSection = document.querySelector('.current-date p');

const routes = [
  {
    label: 'List',
    page: () => {
      renderHomePage();
    },
  },
  {
    label: 'Add new',
    page: () => {
      renderFormPage();
    },
  },
  {
    label: 'Contact',
    page: () => {
      renderContactPage();
    },
  },
];

const renderRoutes = () => {
  let routeHtml = '';
  routes.forEach((route) => {
    routeHtml += `
      <li>
        <a href="#">${route.label}</a>
    </li>
      `;
  });

  navLinkContainer.innerHTML = routeHtml;
};

const renderHomePage = () => {
  main.innerHTML = BookListPage();
  Book.fetchBooksFromStorage();
};

// Displays the add form page which add new book
const renderFormPage = () => {
  main.innerHTML = addBookForm();
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const newBook = new Book(title, author);
    newBook.addBook();
    newBook.saveToStorage();
    form.reset();
    renderHomePage();
  });
};

// Displays the contact page
const renderContactPage = () => {
  main.innerHTML = Contact();
};

const findRoute = (pagelabel) => {
  const route = routes.find((item) => item.label === pagelabel);
  route.page();
};

const getCurrentDateTime = () => {
  const dt = DateTime.local();
  const formatted = dt.toFormat('DDD, tt');
  dateSection.textContent = formatted;
};

// remove all active classes from navigation links
const removeAllActiveClasses = () => {
  const navLinks = document.querySelectorAll('nav ul li');
  navLinks.forEach((link) => {
    link.children[0].classList.remove('active');
  });
};

navLinkContainer.addEventListener('click', (e) => {
  if (e.target.matches('li a')) {
    e.preventDefault();
    findRoute(e.target.textContent);
    removeAllActiveClasses();
    e.target.classList.add('active');
    sessionStorage.setItem('page', e.target.textContent);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  renderRoutes();
  getCurrentDateTime();
  const currentPage = sessionStorage.getItem('page');

  if (currentPage) {
    findRoute(currentPage);
  } else {
    renderHomePage();
  }
});
