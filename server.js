const express = require('express');
const body_parser = require('body-parser');
const db = require('diskdb');
const { routeMovies } = require('./routeMovies');
const { routeExpressions } = require('./routeExpressions');

db.connect('./data', ['movies']);
const server = express();
server.use(body_parser.json());
const port = 4000;

if (!db.movies.find().length) {
  const movie = { id: 'tt0110357', name: 'The Lion King', genre: 'animation' };
  db.movies.save(movie);
}

routeMovies(server, db.movies);
routeExpressions(server);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
