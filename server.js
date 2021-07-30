const express = require('express')
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.post('/', (req, res) => {
  res.json(req.body.parameters)
});


app.listen(5000, () => {
  console.log(`app listening on port ${5000}`)
});