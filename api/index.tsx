const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const myPool = require("./db/db.tsx");

const port = process.env.DB_PORT || 5432;

app.use(cors());
app.use(express.json());



app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
