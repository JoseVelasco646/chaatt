const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("enviarMensaje", (mensaje) => {
    console.log("Mensaje recibido:", mensaje);

    socket.broadcast.emit("recibirMensaje", mensaje);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});
