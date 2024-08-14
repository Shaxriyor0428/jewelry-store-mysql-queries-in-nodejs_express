const express = require("express");
require("dotenv").config();

const port = 3000;
const app = express();

const indexRouter = require("./routes");
app.use(express.json());
app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});





