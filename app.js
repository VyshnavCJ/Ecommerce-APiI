require("express-async-errors");
require("dotenv").config();
const express = require("express");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//app
const app = express();

//MongoDB connection
const connectDB = require("./db/connect");
const morgan = require("morgan");

//routes
const authRouter = require("./routes/authRoutes");

//port
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(express.json());

//middleware

app.get("/", (req, res) => {
  res.send("E-commerce=api");
});

app.use("/api/v1/auth", authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
