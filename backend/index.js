const express = require("express");
const app = express();

// startup modules
require("dotenv").config({ path: "./config.env" });
require("./startup/db")();
require("./startup/routes")(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
