const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = express();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // origin der Anfrage an dem Server ist offen für alle 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') // die HTTP-Header an, die in der Anfrage zulässig sind. Content-Type, Authorization
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // erlaubte HTTP-Methoden
    next()
})

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db

const middlewares = jsonServer.defaults()
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
    console.log("JSON Server is running on port 3000");
});