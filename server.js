const express = require('express');
const body_parser = require('body-parser');
const db = require('diskdb');
db.connect('./data', ['movies']);
const server = express();
server.use(body_parser.json());
const port = 4000;

if (!db.movies.find().length) {
  const movie = { id: 'tt0110357', name: 'The Lion King', genre: 'animation' };
  db.movies.save(movie);
}

// CREATE
server.post('/items', (req, res) => {
  const item = req.body;
  console.log('Adding new item', item);

  const items = db.movies.find({ id: item.id });
  if (!items.length) {
    db.movies.save(item);
    res.json(db.movies.find());
  } else {
    res.json({ message: `Item ${item.id} already exists` })
  }
});

// READ ALL
server.get('/items', (req, res) => {
  console.log('Getting all items');
  res.json(db.movies.find());
});

// READ ONE
server.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  console.log('Getting item', itemId);

  const items = db.movies.find({ id: itemId });
  if (items.length) {
     res.json(items);
  } else {
     res.json({ message: `Item ${itemId} doesn't exist` })
  }
});

// UPDATE
server.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = req.body;
  console.log('Editing item', itemId, 'to be', item);

  db.movies.update({ id: itemId }, item);

  res.json(db.movies.find());
});

// DELETE
server.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  console.log('Deleting item with id', itemId);

  db.movies.remove({ id: itemId });

  res.json(db.movies.find());
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
