const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');



// init app and middleware
const app = express()
app.use(express.json())     // built-in middleware: It parses incoming requests with JSON payloads 

// Allow requests from 'http://localhost:5173'
// app.use(cors({
//   // origin: 'http://localhost:5173'
//   origin: 'https://inotebook-app-pi.vercel.app/'
// }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://inotebook-app-pi.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// connect to database
connectToMongo();

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`)
})