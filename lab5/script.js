class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class Librarian extends User {
  constructor(id, name, email, salary) {
    super(id, name, email);
    this.salary = salary;
  }

  addBook(library, bookData) {
    const book = new Book(bookData.title, bookData.author);
    return library.addBook(book);
  }

  removeBook(library, bookId) {
    return library.removeBook(bookId);
  }
}

class Reader extends User {
  constructor(id, name, email, membershipId) {
    super(id, name, email);
    this.membershipId = membershipId;
  }

  borrowBook(library, bookId, dueDate) {
    return library.createLoan(this, bookId, dueDate);
  }

  returnBook(library, bookId) {
    return library.returnBook(this, bookId);
  }
}

class Book {
  constructor(title, author) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }

  borrow() {
    if (!this.isAvailable) {
      throw new Error("Book is not available");
    }
    this.isAvailable = false;
  }

  return() {
    this.isAvailable = true;
  }
}

class Loan {
  constructor(book, reader, dueDate) {
    this.book = book;
    this.reader = reader;
    this.dueDate = dueDate;
    this.isReturned = false;
  }

  isOverdue() {
    return !this.isReturned && new Date() > this.dueDate;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.users = [];
    this.loans = [];
  }

  addBook(book) {
    this.books.push(book);
    return book;
  }

  removeBook(bookId) {
    const index = this.books.findIndex((book) => book.id === bookId);
    if (index === -1) {
      throw new Error("Book not found");
    }

    const activeLoad = this.loans.find(
      (loan) => loan.book.id === bookId && !loan.isReturned,
    );
    if (activeLoad) {
      throw new Error("Cannot remove book that is currently loaned");
    }

    this.books.splice(index, 1);
    return true;
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  createLoan(reader, bookId, dueDate) {
    const book = this.books.find((b) => b.id === bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    if (!book.isAvailable) {
      throw new Error("Book is not available");
    }

    const loan = new Loan(book, reader, dueDate);
    book.borrow();
    this.loans.push(loan);
    return loan;
  }

  returnBook(reader, bookId) {
    const loan = this.loans.find(
      (l) => l.book.id === bookId && l.reader.id === reader.id && !l.isReturned,
    );

    if (!loan) {
      throw new Error("Active loan not found");
    }

    loan.book.return();
    loan.isReturned = true;
    return true;
  }

  getOverdueLoans() {
    return this.loans.filter((loan) => loan.isOverdue());
  }
}

function runTests() {
  console.log("Starting library system tests...");

  const library = new Library();

  const librarian = new Librarian(
    "L1",
    "John Librarian",
    "john@library.com",
    50000,
  );
  const reader1 = new Reader("R1", "Alice Reader", "alice@email.com", "M001");
  const reader2 = new Reader("R2", "Bob Reader", "bob@email.com", "M002");

  library.addUser(librarian);
  library.addUser(reader1);
  library.addUser(reader2);

  console.log("\nTest 1: Adding books");
  try {
    const book1 = librarian.addBook(library, {
      title: "1984",
      author: "George Orwell",
    });
    const book2 = librarian.addBook(library, {
      title: "Brave New World",
      author: "Aldous Huxley",
    });
    console.log("✓ Books added successfully");
  } catch (error) {
    console.error("✗ Error adding books:", error.message);
  }

  console.log("\nTest 2: Borrowing available book");
  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const loan = reader1.borrowBook(library, library.books[0].id, dueDate);
    console.log("✓ Book borrowed successfully");
  } catch (error) {
    console.error("✗ Error borrowing book:", error.message);
  }

  console.log("\nTest 3: Attempting to borrow unavailable book");
  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    reader2.borrowBook(library, library.books[0].id, dueDate);
    console.log("✗ Should not be able to borrow unavailable book");
  } catch (error) {
    console.log(
      "✓ Correctly prevented borrowing unavailable book:",
      error.message,
    );
  }

  console.log("\nTest 4: Returning book");
  try {
    reader1.returnBook(library, library.books[0].id);
    console.log("✓ Book returned successfully");
  } catch (error) {
    console.error("✗ Error returning book:", error.message);
  }

  console.log("\nTest 5: Removing book");
  try {
    librarian.removeBook(library, library.books[0].id);
    console.log("✓ Book removed successfully");
  } catch (error) {
    console.error("✗ Error removing book:", error.message);
  }

  console.log("\nAll tests completed.");
}

runTests();
