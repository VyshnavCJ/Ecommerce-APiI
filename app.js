require("express-async-errors");
require("dotenv").config();
const express = require("express");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//auth handlers
//const authMiddleware = require("./middleware/authentication");

//app
const app = express();

//MongoDB connection
const connectDB = require("./db/connect");

//package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRouters");
//port
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());
//middleware

app.get("/", (req, res) => {
  res.send("E-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("E-commerce api");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/review", reviewRouter);
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
