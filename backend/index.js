const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const path = require('path');


// init app and middleware
const app = express()
app.use(express.json())     // built-in middleware: It parses incoming requests with JSON payloads 

// Allow requests from 'http://localhost:5173'
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));


app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://inotebook-app-pi.vercel.app');  
  // res.setHeader('Access-Control-Allow-Origin', 'https://inotebook-fwvvq0ymb-atmaram-kamblis-projects.vercel.app');
  res.setHeader('Access-Control-Allow-Origin', 'https://inotebook-c2jvc2rvx-atmaram-kamblis-projects.vercel.app/');
  
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, auth-token');
  next();
});

const allowedOrigins = [
  'https://inotebook-fwvvq0ymb-atmaram-kamblis-projects.vercel.app',
  'https://inotebook-app-pi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// connect to database
connectToMongo();

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/password', require('./routes/passwordReset'));
app.use('/api/notes', require('./routes/notes'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// This is the catchall handler: for any req that doesn't match one above 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`)
})
