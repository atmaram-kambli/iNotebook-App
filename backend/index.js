const express = require('express');
const connectToMongo = require('./db');

// init app and middleware
const app = express()
app.use(express.json())     // built-in middleware: It parses incoming requests with JSON payloads 


// connect to database
connectToMongo();

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})