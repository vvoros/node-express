function routeMovies(server, moviesDb) {
  // CREATE
  server.post('/items', (req, res) => {
    const item = req.body;
    console.log('Adding new item', item);

    const items = moviesDb.find({ id: item.id });
    if (!items.length) {
      moviesDb.save(item);
      res.json(moviesDb.find());
    } else {
      res.json({ message: `Item ${item.id} already exists` });
    }
  });

  // READ ALL
  server.get('/items', (req, res) => {
    console.log('Getting all items');
    res.json(moviesDb.find());
  });

  // READ ONE
  server.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    console.log('Getting item', itemId);

    const items = moviesDb.find({ id: itemId });
    if (items.length) {
      res.json(items);
    } else {
      res.json({ message: `Item ${itemId} doesn't exist` });
    }
  });

  // UPDATE
  server.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log('Editing item', itemId, 'to be', item);

    moviesDb.update({ id: itemId }, item);

    res.json(moviesDb.find());
  });

  // DELETE
  server.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    console.log('Deleting item with id', itemId);

    moviesDb.remove({ id: itemId });

    res.json(moviesDb.find());
  });
}

module.exports = {
  routeMovies,
};