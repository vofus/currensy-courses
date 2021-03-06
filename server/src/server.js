require("dotenv").config();
const path = require("path");
const { createConnection } = require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const apiRouter = require("./routes");

const { PORT } = process.env;
const app = express();

(async () => {
  try {
    await createConnection();

		app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.use(bodyParser.json());
    app.use("/api", apiRouter);

    app.listen(PORT, () => {
      global.console.log(`Server started on ${PORT} port...`);
    });
  } catch (e) {
    global.console.error(e);
  }
})();
