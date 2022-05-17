const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Define custom routes (routes.json)
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));
server.use(jsonServer.rewriter(routes));

// Custom middleware for modifying data
server.use((req, res, next) => {
  next()
});

const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Custom response wrapper
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data
  })
}

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
});


