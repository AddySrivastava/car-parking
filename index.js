const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

const serviceRoot = '/management/v1/api';


app.use(bodyParser.json());
app.use(cors())

// base health check
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'app is listening at port 5000' })
})

// register routes
app.use(serviceRoot, require('./routes/carParking'));

app.listen(5000, () => {
    console.log('app is listening at port 5000');
})