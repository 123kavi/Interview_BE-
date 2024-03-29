const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();

const DUMMY_MS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/massages', (req, res, next) => {
  res.status(200).json({ massages: DUMMY_MS });
});

app.post('/massage', (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim().length === 0 ) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title'
    });
  }

  const createdMassage = {
    id: uuid(),
    title
  };

  DUMMY_MS.push(createdMassage);

  // Log massage details to the console
  console.log('New massage created:', createdMassage);

  res
    .status(201)
    .json({ message: 'Created new massage.', massage: createdMassage });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
