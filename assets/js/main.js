const localStorageKey = "BOOKS_DATA";
let addBookBtn = document.querySelector(".add-book");
    modalBg = document.querySelector(".modal");
    modalClose = document.querySelector(".modal-close");
const bookTitle = document.querySelector("#inputBookTitle");
const bookAuthor = document.querySelector("#inputBookAuthor");
const bookYear = document.querySelector("#inputBookYear");
const completed = document.querySelector("#inputBookIsComplete");
const submitBtn = document.querySelector("#bookSubmit");
const search = document.querySelector("#search_books");

let input = [];
    title = null;
    author = null;
    year = null;

window.addEventListener("load", function () {
  if (localStorage.getItem(localStorageKey) !== null) {
    const booksData = getBook();
    makeBook(booksData);
  }
});

addBookBtn.addEventListener("click", function () {
  modalBg.classList.add("md-active");
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("md-active");
});

search.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (localStorage.getItem(localStorageKey) == null) {
      return alert("Tidak ada data buku");
    } else {
      const getTitle = getBook().filter(
        (item) => item.title == search_books.value);
      if (getTitle.length == 0) {
            alert(
              `Judul buku ${search_books.value} tidak ditemukan `
            );
      } else {
        bookSearchResult(getTitle);
      }
    }
    search_books.value = "";
  }
}

submitBtn.addEventListener("click", function () {
  if (submitBtn.value == "") {
    bookInput = [];

    bookInput.push(title, author, year);
    let result = confirmation(input);

    if (result.includes(false)) {
      return false;
    } else {
      const newBook = {
        id: +new Date(),
        title: bookTitle.value,
        author: bookAuthor.value,
        year: bookYear.value,
        isCompleted: completed.checked,
      };
      addBook(newBook);

      bookTitle.value = "";
      bookAuthor.value = "";
      year.value = "";
      completed.checked = false;
    }
  } 
});

function confirmation(check) {
  let result = [];

  check.forEach((a, i) => {
    if (a == false) {
      if (i == 0) {
        result.push(false);
      } else if (i == 1) {
        result.push(false);
      } else {
        result.push(false);
      }
    }
  });

  return result;
}

function addBook(book) {
  let bookData = [];

  if (localStorage.getItem(localStorageKey) === null) {
    localStorage.setItem(localStorageKey, 0);
  } else {
    bookData = JSON.parse(localStorage.getItem(localStorageKey));
  }

  bookData.unshift(book);
  localStorage.setItem(localStorageKey, JSON.stringify(bookData));

  makeBook(getBook());
}

function getBook() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function makeBook(books = []) {
  const inCompleted = document.querySelector("#incompleteBookshelfList");
  const completed = document.querySelector("#completeBookshelfList");

  inCompleted.innerHTML = "";
  completed.innerHTML = "";

  books.forEach((book) => {
    if (book.isCompleted == false) {
      let container = `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action">
                    <button class="checked" onclick="completedBook('${book.id}')"></button>
                    <button class="delete" onclick="deleteBook('${book.id}')"></button>
                </div>
            </article>
            `;

      inCompleted.innerHTML += container;
    } else {
      let container = `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>

                <div class="action">
                    <button class="undo" onclick="uncompletedBook('${book.id}')"></button>
                    <button class="delete" onclick="deleteBook('${book.id}')"></button>
                </div>
            </article>
            `;
      completed.innerHTML += container;
    }
  });
}

function bookSearchResult(books) {
  const searchResult = document.querySelector("#searchResult");

  searchResult.innerHTML = "";

  books.forEach((book) => {
    let container = `
        <article class="bookResults">
            <h3 class="titleInfo">${book.title}</h3>
            <p class="info">Penulis: ${book.author}</p>
            <p class="info">Tahun: ${book.year}</p>
            <p class="info">${
              book.isCompleted ? "<img src='./assets/image/readed.png'> Selesai dibaca" : "<img src='./assets/image/read.png'> Belum dibaca"
            }</p>
        </article>
        `;

    searchResult.innerHTML += container;
  });
}

function completedBook(id) {
  let permit = confirm("Pindahkan ke rak selesai dibaca?");

  if (permit == true) {
    const bookDetail = getBook().filter((item) => item.id == id);
    const newBook = {
      id: bookDetail[0].id,
      title: bookDetail[0].title,
      author: bookDetail[0].author,
      year: bookDetail[0].year,
      isCompleted: true,
    };

    const bookData = getBook().filter((item) => item.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    addBook(newBook);
  } else {
    return 0;
  }
}

function uncompletedBook(id) {
  let permit = confirm("Pindahkan ke rak belum selesai dibaca?");

  if (permit == true) {
    const bookDetail = getBook().filter((item) => item.id == id);
    const newBook = {
      id: bookDetail[0].id,
      title: bookDetail[0].title,
      author: bookDetail[0].author,
      year: bookDetail[0].year,
      isCompleted: false,
    };

    const bookData = getBook().filter((item) => item.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    addBook(newBook);
  } else {
    return 0;
  }
}

function deleteBook(id) {
  let permit = confirm("Ingin menghapus buku?");

  if (permit == true) {
    const bookDetail = getBook().filter((item) => item.id == id);
    const bookData = getBook().filter((item) => item.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    makeBook(getBook());
    alert(`Buku ${bookDetail[0].title} berhasil terhapus`);
  } else {
    return 0;
  }
}
