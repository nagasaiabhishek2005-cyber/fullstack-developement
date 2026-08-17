db.books.aggregate([
  { $match: { year: { $gt: 1900 } } },
  { $group: { _id: "$genre", count: { $sum: 1 }, avgPrice: { $avg: "$price" } } },
  { $sort: { count: -1 } },
  { $project: { genre: "$_id", count: 1, avgPrice: 1, _id: 0 } }
])