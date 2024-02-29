const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 
const router = require('./router/routers')


app.use('/', router)
app.listen(port, () => console.log(`Listening on port ${port}`));


