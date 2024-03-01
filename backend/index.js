const express = require('express');
const connectToMongo = require('./db');

// init app and middleware
const app = express()

// connect to database
connectToMongo();

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})