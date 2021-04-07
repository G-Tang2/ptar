const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const myPool = require("./db/db.tsx");
const absQuestionsRouter = require("./routes/absQuestions");
const wptasQuestionsRouter = require("./routes/wptasQuestions");

const port = 5000;

app.use(cors());
app.use(express.json());

app.use(absQuestionsRouter)
app.use(wptasQuestionsRouter)

app.listen(port, () => console.log(`App listening at port ${port}`));
