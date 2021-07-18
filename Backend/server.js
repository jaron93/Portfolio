const express = require('express');
const { port } = require('./config/config');
const cors = require('cors');


const app = express();
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Initialize DB
require('./config/initdDB')();

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
   res.json({ message: "Welcome to Jaroslaw api route." });
});
/* // parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); */




// In case if I need to set up a cors for project url
/* var corsOptions = {
   origin: "http://localhost:8081"
 };
 
 app.use(cors(corsOptions)); */


app.listen(port, () => console.log('Server running on port: ' + port));