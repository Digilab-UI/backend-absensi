require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactsRouter = require('./routes/contacts');



const app = express();
app.set('json spaces', 2);
const PORT = process.env.PORT || 3000;


// Security middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 min per IP

app.use(morgan('dev'));
app.use(express.json());

app.use('/contacts', contactsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
