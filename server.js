const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const router = require('./backend/router');

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }))
app.use(cors({
  origin: '*'
}));

app.use('/', router);

app.listen(5000, () => {
  console.log(`app listening on port ${5000}`)
});