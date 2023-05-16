const express = require('express');

const bodyParser = require('body-parser');
const postRoute = require('./routes/post')

const app = express();

// Parse JSON request body
app.use(bodyParser.json());

// Route definitions
app.use('/api', postRoute);

const port=3000
// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
module.exports=app;
