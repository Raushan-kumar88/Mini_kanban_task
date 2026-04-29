const express = require('express');
const cors = require("cors");
const taskRoute = require('./routes/taskRoute')
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/tasks',taskRoute)

app.listen(PORT, () => {
    console.log(`server is listen at ${PORT}`)
})