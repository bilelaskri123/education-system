const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const productsRoutes = require("./routes/product.routes");
const booksRoutes = require("./routes/book.routes");
const sectionRoutes = require("./routes/section.routes");
const userRoutes = require("./routes/user.routes");
const groupRoutes = require("./routes/group.routes");
const accountantRoutes = require("./routes/accountant.routes");
const librarianRoutes = require("./routes/librarian.routes");
const teacherRoutes = require("./routes/teacher.routes");
const studentRoutes = require("./routes/student.routes");
const parentRoutes = require("./routes/parent.routes");
const courseRoutes = require("./routes/course.routes");
const reserBookRoutes = require("./routes/reservationBook.routes");
const reserProductRoutes = require("./routes/reservationProduct.routes");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/pfeproject", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/product", productsRoutes);
app.use("/api/book", booksRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/accountant", accountantRoutes);
app.use("/api/librarian", librarianRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/reserBook", reserBookRoutes);
app.use("/api/reserProduct", reserProductRoutes);
module.exports = app;
