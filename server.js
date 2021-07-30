const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.json({message: 'We connected!'})
})

app.listen(5000, () => {
  console.log(`app listening on port ${5000}`)
});