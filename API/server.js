const express = require("express");
const app = express();
const routes = require('./routes');
const port = 3000;
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/static', express.static('public'));

app.get("/", (req, res) => {
    res.send(routes.stack);
});

app.use('/api', routes);

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`);
});
