const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io");

const io = new Server(server)

app.use(express.static("public"))

io.on("connection", socket => {
    console.log("socket connected!!")  // Memastikan bahwa socket terhubung
    socket.on("kirim-pesan", pesan => {
        console.log("pesan diterima:", pesan);  // Debug pesan yang diterima
        socket.broadcast.emit("pesan-baru", pesan)
    })
});

server.listen(3001, () => console.log('Server berjalan di port 3001'));  // Menggunakan server.listen bukan app.listen