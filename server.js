const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const router = require('./backend/router');
const serverSession = require('express-session')

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }))
app.use(cors({
  origin: '*'
}));
// app.set('trust proxy',1)
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {secure:true}
// }))
app.use('/', router);

app.listen(5000, () => {
  console.log(`app listening on port ${5000}`)
});