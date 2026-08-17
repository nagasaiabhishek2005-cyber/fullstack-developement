// 1. Switch or create database 'library'
use library

// 2. CREATE: Insert documents into 'books' collection
db.books.insertMany([
  { title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Classic" }
])

// 3. READ: Query all books & search by specific author
// Display all books formatted
db.books.find()

// Find books by author "George Orwell"
db.books.find({ author: "George Orwell" })

// 4. UPDATE: Modify publication year of a book
db.books.updateOne(
  { title: "1984" },
  { $set: { year: 1950 } }
)

// 5. DELETE: Delete a book by title
db.books.deleteOne({ title: "The Great Gatsby" })

// 6. VERIFY: View updated collection
db.books.find()