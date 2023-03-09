require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/index');
const { errorMiddleware } = require('./middlewares');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
