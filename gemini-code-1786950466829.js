switched to db library

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('65a000000000000000000001'),
    '1': ObjectId('65a000000000000000000002'),
    '2': ObjectId('65a000000000000000000003')
  }
}

// Find result by author:
[
  {
    _id: ObjectId('65a000000000000000000001'),
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    genre: 'Dystopian'
  }
]

// Update acknowledgment:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

// Delete acknowledgment:
{ acknowledged: true, deletedCount: 1 }