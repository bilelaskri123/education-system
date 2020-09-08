const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const socket = require("socket.io");

students = [];
teachers = [];
parents = [];

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, () => {
  console.log(`server connected in http://localhost:${port}`);
});

var io = socket(server);

io.on("connection", function (socket) {
  console.log("New connection made !!", socket.id);
  socket.on("new user", function (data) {
    socket.join(data.room);
    if (data.room == "students") {
      socket.nickname1 = data;
      students.push(socket.nickname1);
      console.log("students", students);
      io.in(data.room).emit("usernames", students);
    } else if (data.room == "teachers") {
      socket.nickname2 = data;
      teachers.push(socket.nickname2);
      console.log("teachers", teachers);
      io.in(data.room).emit("usernames", teachers);
    } else {
      socket.nickname3 = data;
      parents.push(socket.nickname3);
      console.log("parents", parents);
      io.in(data.room).emit("usernames", parents);
    }
  });

  socket.on("disconnect", function (data) {
    console.log("disconnected", socket.id);
    var forStudents = students.indexOf(socket.nickname1);
    var forTeachers = teachers.indexOf(socket.nickname2);
    var forParents = parents.indexOf(socket.nickname3);
    if (forStudents !== -1) {
      students.splice(forStudents, 1);
      io.in("Students").emit("usernames", students);
    } else if (forTeachers !== -1) {
      teachers.splice(forTeachers, 1);
      io.in("Teachers").emit("usernames", teachers);
    } else if (forParents !== 1) {
      parents.splice(forParents, 1);
      io.in("parents").emit("usernames", parents);
    }
  });

  socket.on("join", function (data) {
    socket.join(data.room);
    console.log(data.user + " Joined the room :- " + data.room);
    socket.broadcast.to(data.room).emit("new user joined", {
      user: data.user,
      message: "has joined this room!!",
    });
  });

  socket.on("leave", function (data) {
    console.log(data.user + " left the room :- " + data.room);
    socket.broadcast.to(data.room).emit("left room", {
      user: data.user,
      message: "has left this room!!",
    });
    socket.leave(data.room);
    if (data.room == "students") {
      socket.nickname1 = data;
      students.pop(socket.nickname1);
      console.log("students", students);
      io.in(data.room).emit("usernames", students);
    } else if (data.room == "teachers") {
      socket.nickname2 = data;
      teachers.pop(socket.nickname2);
      console.log("teachers", teachers);
      io.in(data.room).emit("usernames", teachers);
    } else {
      socket.nickname3 = data;
      parents.pop(socket.nickname3);
      console.log("parents", parents);
      io.in(data.room).emit("usernames", parents);
    }
  });

  socket.on("message", function (data) {
    var d = new Date();
    // chat.insertOne(data, function(err, res) {
    //   console.log('Wooo...New message Inserted in database!!')
    // })
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
      time: data.Time,
    });
  });

  socket.on("typing", function (data) {
    console.log(data.user + " typing in room :- " + data.room);
    socket.broadcast
      .to(data.room)
      .emit("user typing", { user: data.user, message: "is typing ...!!" });
  });
});
