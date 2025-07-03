// Bookshelf App with LocalStorage & Unified Book List

let books = [];
let isEditing = false;
let editingBookId = null;
let bookToDeleteId = null;

window.addEventListener("DOMContentLoaded", () => {
  loadBooksFromLocalStorage();
  renderBooks();

  const searchInput = document.getElementById("searchBookTitle");
  const bookForm = document.getElementById("bookForm");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const openModalBtn = document.getElementById("openModalBtn");

  const deleteConfirmModal = document.getElementById("deleteConfirmModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const bookTitleToDeleteSpan = document.getElementById("bookTitleToDelete");


  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    renderBooks(keyword);
  });

  document.getElementById("filterStatus")?.addEventListener("change", () => {
    const keyword = searchInput.value.toLowerCase();
    renderBooks(keyword);
  });

  document.getElementById("sortOption")?.addEventListener("change", () => {
    const keyword = searchInput.value.toLowerCase();
    renderBooks(keyword);
  });

  bookForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    if (isEditing && editingBookId !== null) {
      const index = books.findIndex(b => b.id === editingBookId);
      if (index !== -1) {
        books[index] = { id: editingBookId, title, author, year, isComplete };
      }
    } else {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
      books.push(newBook);
    }

    saveToLocalStorage();
    renderBooks();
    bookForm.reset();
    document.getElementById("bookModal").classList.remove("show");
    isEditing = false;
    editingBookId = null;
  });

  closeModalBtn?.addEventListener("click", () => {
    isEditing = false;
    editingBookId = null;
    document.getElementById("bookForm").reset();
    document.getElementById("bookModal").classList.remove("show");
  });

  openModalBtn.addEventListener("click", () => {
    document.getElementById("bookFormTitle").value = "";
    document.getElementById("bookFormAuthor").value = "";
    document.getElementById("bookFormYear").value = "";
    document.getElementById("bookFormIsComplete").checked = false;
    document.getElementById("modalTitle").textContent = "Tambah Buku";
    isEditing = false;
    editingBookId = null;
    document.getElementById("bookModal").classList.add("show");
  });

  confirmDeleteBtn.addEventListener("click", () => {
    if (bookToDeleteId !== null) {
      books = books.filter((b) => b.id !== bookToDeleteId);
      saveToLocalStorage();
      renderBooks();
      bookToDeleteId = null;
      deleteConfirmModal.classList.remove("show");
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    bookToDeleteId = null;
    deleteConfirmModal.classList.remove("show");
  });
});

function renderBooks(filter = "") {
  const bookListContainer = document.getElementById("bookListContainer");
  if (!bookListContainer) return;

  bookListContainer.innerHTML = "";

  const filterStatus = document.getElementById("filterStatus")?.value || "all";
  const sortOption = document.getElementById("sortOption")?.value || "default";

  let filteredBooks = books.filter((book) => {
    const combined = `${book.title} ${book.author} ${book.year}`.toLowerCase();
    const matchKeyword = combined.includes(filter);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "complete" && book.isComplete) ||
      (filterStatus === "incomplete" && !book.isComplete);
    return matchKeyword && matchStatus;
  });

  if (sortOption === "title") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "year") {
    filteredBooks.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  const incompleteBooks = filteredBooks.filter(b => !b.isComplete);
  const completeBooks = filteredBooks.filter(b => b.isComplete);

  const incompleteSection = document.createElement("div");
  incompleteSection.className = "book-section incomplete-section";
  const incompleteLabel = document.createElement("span");
  const incompleteGrid = document.createElement("div");
  incompleteGrid.className = "book-grid";

  incompleteSection.appendChild(incompleteLabel);
  incompleteSection.appendChild(incompleteGrid);

  const completeSection = document.createElement("div");
  completeSection.className = "book-section complete-section";
  const completeLabel = document.createElement("span");
  const completeGrid = document.createElement("div");
  completeGrid.className = "book-grid";

  completeSection.appendChild(completeLabel);
  completeSection.appendChild(completeGrid);

  bookListContainer.appendChild(incompleteSection);

  if (incompleteBooks.length > 0 && completeBooks.length > 0) {
    const separatorDiv = document.createElement("div");
    separatorDiv.className = "section-separator";
    bookListContainer.appendChild(separatorDiv);
  } else if (incompleteBooks.length === 0 && completeBooks.length === 0) {
    const noBooksMessage = document.createElement("p");
    noBooksMessage.textContent = "Tidak ada buku di koleksi Anda. Tambahkan buku baru!";
    noBooksMessage.style.color = "var(--color-gray)";
    noBooksMessage.style.textAlign = "center";
    noBooksMessage.style.width = "100%";
    bookListContainer.appendChild(noBooksMessage);
  }


  bookListContainer.appendChild(completeSection);


  if (incompleteBooks.length > 0) {
    incompleteBooks.forEach(book => {
      incompleteGrid.appendChild(createBookElement(book, filter));
    });
  } else {
    const noBooksMessage = document.createElement("p");
    noBooksMessage.textContent = "Tidak ada buku di rak 'Belum Dibaca'.";
    noBooksMessage.style.color = "var(--color-gray)";
    incompleteGrid.appendChild(noBooksMessage);
  }

  if (completeBooks.length > 0) {
    completeBooks.forEach(book => {
      completeGrid.appendChild(createBookElement(book, filter));
    });
  } else {
    const noBooksMessage = document.createElement("p");
    noBooksMessage.textContent = "Tidak ada buku di rak 'Selesai Dibaca'.";
    noBooksMessage.style.color = "var(--color-gray)";
    completeGrid.appendChild(noBooksMessage);
  }
}

function createBookElement(book, highlight = "") {
  const card = document.createElement("div");
  card.className = "book-card";
  card.setAttribute("data-bookid", book.id);

  const actions = document.createElement("div");
  actions.className = "book-actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-read" + (book.isComplete ? " active" : "");
  toggleBtn.title = book.isComplete ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca";
  toggleBtn.innerHTML = '<i class="bi bi-check2-circle"></i>';
  toggleBtn.addEventListener("click", () => {
    book.isComplete = !book.isComplete;
    saveToLocalStorage();
    renderBooks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.title = "Hapus Buku";
  deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
  deleteBtn.addEventListener("click", () => {
    const bookTitleToDeleteSpan = document.getElementById("bookTitleToDelete");
    bookTitleToDeleteSpan.textContent = book.title;
    bookToDeleteId = book.id;
    document.getElementById("deleteConfirmModal").classList.add("show");
  });

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.title = "Edit Buku";
  editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
  editBtn.addEventListener("click", () => {
    document.getElementById("bookFormTitle").value = book.title;
    document.getElementById("bookFormAuthor").value = book.author;
    document.getElementById("bookFormYear").value = book.year;
    document.getElementById("bookFormIsComplete").checked = book.isComplete;
    document.getElementById("modalTitle").textContent = "Edit Buku";
    isEditing = true;
    editingBookId = book.id;
    document.getElementById("bookModal").classList.add("show");
  });

  actions.append(editBtn, toggleBtn, deleteBtn);

  const header = document.createElement("div");
  header.className = "book-header";
  const thumb = document.createElement("div");
  thumb.className = "book-thumb";
  thumb.textContent = book.isComplete ? "📙" : "📘";

  const meta = document.createElement("div");
  meta.className = "book-meta";
  const title = document.createElement("h4");
  const author = document.createElement("span");
  const year = document.createElement("span");

  if (highlight) {
    const regex = new RegExp(`(${highlight})`, "gi");
    title.innerHTML = book.title.replace(regex, '<mark>$1</mark>');
    author.innerHTML = book.author.replace(regex, '<mark>$1</mark>');
    year.innerHTML = book.year.toString().replace(regex, '<mark>$1</mark>');
  } else {
    title.textContent = book.title;
    author.textContent = book.author;
    year.textContent = book.year;
  }

  const separator = document.createElement("span");
  separator.textContent = " - ";
  meta.append(title, author, separator, year);
  header.append(thumb, meta);

  const description = document.createElement("p");
  description.className = "book-description";
  description.textContent = `Buku oleh ${book.author}, diterbitkan pada ${book.year}`;

  const label = document.createElement("span");
  label.className = book.isComplete ? "subscribe read" : "subscribe";
  label.textContent = book.isComplete ? "Selesai Dibaca" : "Belum Dibaca";

  card.append(actions, header, description, label);
  return card;
}

function saveToLocalStorage() {
  localStorage.setItem("BOOKS", JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  const data = localStorage.getItem("BOOKS");
  if (data) books = JSON.parse(data);
}
