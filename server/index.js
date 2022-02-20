const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8080;

//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(__dirname + '/dist'));

    //Routes
const categorysRoute = require("./src/routes/categorysRoute");
const tasksRoute = require("./src/routes/tasksRoute");
app.use("/categorys", categorysRoute);
app.use("/tasks", tasksRoute);

    //404 error handling
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: -2,
    descripcion: `route ${req.originalUrl} method ${req.method} not implemented`,
  });
});

//SERVER START
app.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}`);
});
