/**
 * PustakaNusa - Digital Library JavaScript Engine
 * Clean Vanilla JS logic compatible with GitHub Pages
 */

// Initial Sample Book Dataset
const INITIAL_BOOKS = [
  {
    id: "B-101",
    title: "Pemrograman Web Modern dengan JavaScript & Node.js",
    author: "Rian Suryadi",
    category: "Teknologi",
    year: 2024,
    rating: 4.9,
    status: "available",
    coverGradient: "cover-gradient-1",
    icon: "fa-code",
    location: "Rak A-02 (Lantai 2)",
    isbn: "978-602-1234-56-1",
    synopsis: "Panduan lengkap mempelajari ekosistem JavaScript dari tingkat dasar hingga mahir. Membahas HTML5, CSS3, ES6+, Async/Await, REST API, hingga deployment ke cloud platform secara langsung."
  },
  {
    id: "B-102",
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    year: 2005,
    rating: 4.8,
    status: "available",
    coverGradient: "cover-gradient-2",
    icon: "fa-feather",
    location: "Rak B-05 (Lantai 1)",
    isbn: "978-979-3062-79-2",
    synopsis: "Kisah inspiratif sepuluh anak Belitung dari keluarga miskin yang berjuang menggapai cita-cita mereka melalui pendidikan di sekolah Muhammadiyah yang penuh keterbatasan."
  },
  {
    id: "B-103",
    title: "Kecerdasan Buatan & Machine Learning untuk Pemula",
    author: "Dr. Budi Santoso",
    category: "Teknologi",
    year: 2025,
    rating: 4.9,
    status: "available",
    coverGradient: "cover-gradient-4",
    icon: "fa-brain",
    location: "Rak A-04 (Lantai 2)",
    isbn: "978-623-8800-11-2",
    synopsis: "Mengupas algoritma Machine Learning, Neural Networks, Computer Vision, dan Large Language Models (LLM) beserta implementasi praktis menggunakan Python dan TensorFlow."
  },
  {
    id: "B-104",
    title: "Sejarah Nusantara: Dari Kerajaan Hingga Republik",
    author: "Prof. Sartono Kartodirdjo",
    category: "Sejarah",
    year: 2021,
    rating: 4.7,
    status: "available",
    coverGradient: "cover-gradient-3",
    icon: "fa-landmark",
    location: "Rak C-01 (Lantai 3)",
    isbn: "978-979-4032-15-0",
    synopsis: "Buku sejarah komprehensif yang memetakan dinamika politik, ekonomi, dan kebudayaan Kepulauan Nusantara mulai zaman pra-aksara, kejayaan Majapahit, masa kolonial, hingga proklamasi kemerdekaan."
  },
  {
    id: "B-105",
    title: "Cosmos: Penjelajahan Alam Semesta",
    author: "Carl Sagan",
    category: "Sains",
    year: 2018,
    rating: 5.0,
    status: "borrowed",
    coverGradient: "cover-gradient-6",
    icon: "fa-user-astronaut",
    location: "Rak S-03 (Lantai 2)",
    isbn: "978-602-0314-88-9",
    synopsis: "Sebuah mahakarya yang menelusuri 15 miliar tahun evolusi kosmik dan peradaban manusia. Menghubungkan sains, filsafat, dan sejarah sains dalam bahasa yang sangat indah."
  },
  {
    id: "B-106",
    title: "Filosofi Teras: Stoisisme untuk Mental Tangguh",
    author: "Henry Manampiring",
    category: "Fiksi",
    year: 2019,
    rating: 4.9,
    status: "available",
    coverGradient: "cover-gradient-5",
    icon: "fa-masks-theater",
    location: "Rak F-02 (Lantai 1)",
    isbn: "978-602-4246-95-1",
    synopsis: "Penerapan filsafat Stoikisme Yunani-Romawi kuno dalam mengatasi emosi negatif, kecemasan, dan masalah kehidupan sehari-hari di era modern secara kontekstual."
  },
  {
    id: "B-107",
    title: "Financial Freedom: Manajemen Keuangan Anak Muda",
    author: "Felicia Putri",
    category: "Bisnis",
    year: 2023,
    rating: 4.6,
    status: "available",
    coverGradient: "cover-gradient-3",
    icon: "fa-chart-line",
    location: "Rak M-01 (Lantai 1)",
    isbn: "978-623-0100-99-4",
    synopsis: "Panduan praktis mengelola pendapatan, perencanaan anggaran, investasi saham & reksa dana, serta strategi mencapai kebebasan finansial sebelum usia 35 tahun."
  },
  {
    id: "B-108",
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    category: "Fiksi",
    year: 1980,
    rating: 4.9,
    status: "available",
    coverGradient: "cover-gradient-2",
    icon: "fa-book-open",
    location: "Rak B-01 (Lantai 1)",
    isbn: "978-979-9731-23-4",
    synopsis: "Novel pergerakan nasional berlatar pergantian abad ke-20. Mengisahkan perjuangan Minke, pemuda pribumi terpelajar yang menantang diskriminasi rasial kolonial Hindia Belanda."
  }
];

// App State
let books = [];
let borrowedList = [];
let currentCategory = "all";
let currentStatus = "all";
let currentSort = "title-asc";
let searchQuery = "";

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  loadData();
  setupEventListeners();
  setupTheme();
  renderCatalog();
  updateBorrowedBadge();
}

/* LocalStorage Data Operations */
function loadData() {
  const savedBooks = localStorage.getItem("pustakanusa_books");
  const savedBorrowed = localStorage.getItem("pustakanusa_borrowed");

  if (savedBooks) {
    books = JSON.parse(savedBooks);
  } else {
    books = [...INITIAL_BOOKS];
    saveBooks();
  }

  if (savedBorrowed) {
    borrowedList = JSON.parse(savedBorrowed);
  } else {
    borrowedList = [];
    saveBorrowed();
  }
}

function saveBooks() {
  localStorage.setItem("pustakanusa_books", JSON.stringify(books));
}

function saveBorrowed() {
  localStorage.setItem("pustakanusa_borrowed", JSON.stringify(borrowedList));
}

/* Event Listeners Setup */
function setupEventListeners() {
  // Hero Search Input & Button
  const heroInput = document.getElementById("hero-search-input");
  const heroBtn = document.getElementById("hero-search-btn");

  const handleSearch = () => {
    searchQuery = heroInput.value.trim().toLowerCase();
    renderCatalog();
    document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
  };

  heroBtn.addEventListener("click", handleSearch);
  heroInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Category Pills Filter
  const categoryPills = document.querySelectorAll(".pill-btn");
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderCatalog();
    });
  });

  // Status & Sort Select Filters
  const statusFilter = document.getElementById("status-filter");
  statusFilter.addEventListener("change", (e) => {
    currentStatus = e.target.value;
    renderCatalog();
  });

  const sortSelect = document.getElementById("sort-select");
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderCatalog();
  });

  // Reset Filter Button
  document.getElementById("reset-filter-btn").addEventListener("click", () => {
    searchQuery = "";
    heroInput.value = "";
    currentCategory = "all";
    currentStatus = "all";

    categoryPills.forEach((p) => p.classList.remove("active"));
    document.querySelector('.pill-btn[data-category="all"]').classList.add("active");
    statusFilter.value = "all";
    sortSelect.value = "title-asc";

    renderCatalog();
  });

  // Modals Toggles & Close Buttons
  document.getElementById("close-book-modal").addEventListener("click", hideBookModal);
  document.getElementById("close-borrow-modal").addEventListener("click", hideBorrowModal);
  document.getElementById("cancel-borrow-btn").addEventListener("click", hideBorrowModal);

  document.getElementById("my-borrowed-btn").addEventListener("click", showMyBorrowedModal);
  document.getElementById("close-my-borrowed-modal").addEventListener("click", hideMyBorrowedModal);

  // Close modals when clicking backdrop overlay
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });
  });

  // Borrow Form Submission
  const borrowForm = document.getElementById("borrow-form");
  const borrowDays = document.getElementById("borrow-days");
  
  borrowDays.addEventListener("change", updateSummaryDates);

  borrowForm.addEventListener("submit", (e) => {
    e.preventDefault();
    processBorrowSubmission();
  });

  // Dark Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
}

/* Render Book Catalog Grid */
function renderCatalog() {
  const grid = document.getElementById("book-grid");
  const emptyState = document.getElementById("empty-state");

  // Filter books
  let filtered = books.filter((book) => {
    const matchesCategory = currentCategory === "all" || book.category === currentCategory;
    const matchesStatus = currentStatus === "all" || book.status === currentStatus;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.category.toLowerCase().includes(searchQuery) ||
      book.isbn.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Sort books
  filtered.sort((a, b) => {
    if (currentSort === "title-asc") return a.title.localeCompare(b.title);
    if (currentSort === "year-desc") return b.year - a.year;
    if (currentSort === "rating-desc") return b.rating - a.rating;
    return 0;
  });

  // Render HTML
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach((book) => {
      const card = createBookCardHTML(book);
      grid.appendChild(card);
    });
  }
}

function createBookCardHTML(book) {
  const isAvailable = book.status === "available";
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
    <div class="book-cover ${book.coverGradient}">
      <span class="status-badge ${book.status}">
        ${isAvailable ? "Tersedia" : "Dipinjam"}
      </span>
      <span class="category-tag">${book.category}</span>
      <div class="cover-decoration">
        <i class="fa-solid ${book.icon} cover-icon"></i>
        <div class="cover-title-preview">${book.title}</div>
      </div>
    </div>

    <div class="book-info">
      <h3 class="book-title" title="${book.title}">${book.title}</h3>
      <p class="book-author"><i class="fa-regular fa-user"></i> ${book.author}</p>
      
      <div class="book-meta">
        <span><i class="fa-regular fa-calendar"></i> ${book.year}</span>
        <span class="book-rating"><i class="fa-solid fa-star"></i> ${book.rating}</span>
      </div>

      <div class="book-actions">
        <button class="btn-secondary btn-detail" onclick="openBookDetail('${book.id}')">
          <i class="fa-solid fa-eye"></i> Detail
        </button>
        ${
          isAvailable
            ? `<button class="btn-primary btn-borrow" onclick="openBorrowModal('${book.id}')">
                <i class="fa-solid fa-hand-holding"></i> Pinjam
               </button>`
            : `<button class="btn-secondary" disabled style="opacity: 0.6; cursor: not-allowed;">
                <i class="fa-solid fa-clock"></i> Dipinjam
               </button>`
        }
      </div>
    </div>
  `;

  return card;
}

/* Book Detail Modal */
window.openBookDetail = function (bookId) {
  const book = books.find((b) => b.id === bookId);
  if (!book) return;

  const content = document.getElementById("modal-book-content");
  const isAvailable = book.status === "available";

  content.innerHTML = `
    <div class="detail-grid">
      <div class="detail-cover ${book.coverGradient}">
        <i class="fa-solid ${book.icon}"></i>
      </div>
      <div>
        <h2 class="detail-title">${book.title}</h2>
        <p class="detail-author">Oleh <strong>${book.author}</strong> (${book.year})</p>

        <div class="detail-tags">
          <span class="status-badge ${book.status}">${isAvailable ? "Tersedia" : "Dipinjam"}</span>
          <span class="category-tag">${book.category}</span>
        </div>

        <div class="detail-meta-list">
          <div><i class="fa-solid fa-barcode"></i> ISBN: ${book.isbn}</div>
          <div><i class="fa-solid fa-location-dot"></i> Lokasi: ${book.location}</div>
          <div><i class="fa-solid fa-star text-primary"></i> Rating: ${book.rating} / 5.0</div>
          <div><i class="fa-solid fa-hashtag"></i> ID: ${book.id}</div>
        </div>

        <h4 style="margin-bottom: 0.4rem;">Sinopsis Buku</h4>
        <p class="detail-synopsis">${book.synopsis}</p>

        <div style="display: flex; gap: 0.75rem;">
          ${
            isAvailable
              ? `<button class="btn-primary" onclick="hideBookModal(); openBorrowModal('${book.id}')">
                  <i class="fa-solid fa-hand-holding"></i> Pinjam Buku Ini
                 </button>`
              : `<button class="btn-secondary" disabled style="opacity:0.6;">Buku Sedang Dipinjam</button>`
          }
          <button class="btn-secondary" onclick="hideBookModal()">Tutup</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("book-modal").classList.remove("hidden");
};

function hideBookModal() {
  document.getElementById("book-modal").classList.add("hidden");
}

/* Borrowing Logic & Simulation */
window.openBorrowModal = function (bookId) {
  const book = books.find((b) => b.id === bookId);
  if (!book || book.status !== "available") {
    showToast("Buku tidak tersedia untuk dipinjam.", "error");
    return;
  }

  document.getElementById("borrow-book-id").value = book.id;
  document.getElementById("borrow-book-title").textContent = book.title;

  updateSummaryDates();
  document.getElementById("borrow-modal").classList.remove("hidden");
};

function hideBorrowModal() {
  document.getElementById("borrow-modal").classList.add("hidden");
  document.getElementById("borrow-form").reset();
}

function updateSummaryDates() {
  const days = parseInt(document.getElementById("borrow-days").value) || 7;
  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + days);

  const formatDate = (d) =>
    d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });

  document.getElementById("summary-borrow-date").textContent = formatDate(today);
  document.getElementById("summary-return-date").textContent = formatDate(returnDate);
}

function processBorrowSubmission() {
  const bookId = document.getElementById("borrow-book-id").value;
  const borrowerName = document.getElementById("borrower-name").value.trim();
  const borrowerId = document.getElementById("borrower-id").value.trim();
  const days = parseInt(document.getElementById("borrow-days").value);

  const book = books.find((b) => b.id === bookId);
  if (!book) return;

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + days);

  // Update Book status
  book.status = "borrowed";
  saveBooks();

  // Create borrowed record
  const borrowedRecord = {
    borrowId: "BW-" + Date.now().toString().slice(-6),
    bookId: book.id,
    bookTitle: book.title,
    bookAuthor: book.author,
    borrowerName: borrowerName,
    borrowerId: borrowerId,
    borrowDate: today.toISOString(),
    returnDate: returnDate.toISOString(),
    status: "active"
  };

  borrowedList.push(borrowedRecord);
  saveBorrowed();

  updateBorrowedBadge();
  renderCatalog();
  hideBorrowModal();

  showToast(`Berhasil meminjam "${book.title}". Selamat membaca!`, "success");
}

/* My Borrowed Books Drawer / Modal */
function showMyBorrowedModal() {
  const modal = document.getElementById("my-borrowed-modal");
  const container = document.getElementById("my-borrowed-list");

  container.innerHTML = "";

  if (borrowedList.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding: 2rem 0; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
        <p>Anda belum meminjam buku apapun saat ini.</p>
      </div>
    `;
  } else {
    borrowedList.forEach((item) => {
      const returnD = new Date(item.returnDate).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });

      const elem = document.createElement("div");
      elem.className = "borrowed-item";
      elem.innerHTML = `
        <div class="borrowed-info">
          <h4>${item.bookTitle}</h4>
          <p><i class="fa-regular fa-user"></i> Peminjam: ${item.borrowerName} (${item.borrowerId})</p>
          <p><i class="fa-regular fa-calendar-check text-primary"></i> Tenggat Kembalikan: <strong>${returnD}</strong></p>
        </div>
        <button class="btn-secondary" onclick="returnBook('${item.borrowId}')">
          <i class="fa-solid fa-rotate-left"></i> Kembalikan
        </button>
      `;
      container.appendChild(elem);
    });
  }

  modal.classList.remove("hidden");
}

function hideMyBorrowedModal() {
  document.getElementById("my-borrowed-modal").classList.add("hidden");
}

window.returnBook = function (borrowId) {
  const index = borrowedList.findIndex((item) => item.borrowId === borrowId);
  if (index === -1) return;

  const item = borrowedList[index];
  const book = books.find((b) => b.id === item.bookId);

  if (book) {
    book.status = "available";
    saveBooks();
  }

  borrowedList.splice(index, 1);
  saveBorrowed();

  updateBorrowedBadge();
  renderCatalog();
  showMyBorrowedModal(); // Refresh modal list
  showToast(`Buku "${item.bookTitle}" telah berhasil dikembalikan!`, "info");
};

function updateBorrowedBadge() {
  const badge = document.getElementById("borrow-count");
  badge.textContent = borrowedList.length;
}

/* Toast Notification Utility */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* Theme Switching (Light / Dark) */
function setupTheme() {
  const currentTheme = localStorage.getItem("pustakanusa_theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
}

function toggleTheme() {
  const activeTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = activeTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("pustakanusa_theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}
