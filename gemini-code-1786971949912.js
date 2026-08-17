// Create index on author ascending
db.books.createIndex({ author: 1 }) // Output: author_1

// List all active indexes
db.books.getIndexes()