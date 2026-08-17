db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
  { $sort: { avgPrice: -1 } }
])