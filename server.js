const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.set('port', process.env.PORT); 

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
  	console.log('Post method:');
  	console.log('req.method: ', req.method);
  	console.log('req.query: ', req.query);
  	console.log('res: ', res);
  	// console.log('next:', next);
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(server.get('port'), () => {
  console.log(`JSON Server is running on: ${server.get('port')}`)
})