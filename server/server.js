const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const rooms = {};
const questions = [
    {
        question: "Capital of France?",
        answers: ["London", "Paris", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "2 + 2 = ?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Color of the sky?",
        answers: ["Blue", "Green", "Red", "Yellow"],
        correct: "Blue"
    }
];

app.get("/", (req, res) => {
    res.send("Quiz Battle Server Running");
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("create-room", (nickname) => {

        const roomCode = Math.random().toString(36).substring(2, 7);

        rooms[roomCode] = {
            players: [
                {
                    id: socket.id,
                    nickname: nickname,
                    score: 0
                }
            ]
        };

        socket.join(roomCode);

        socket.emit("room-created", roomCode);

        io.to(roomCode).emit("players-update", rooms[roomCode].players);

        console.log("Room created:", roomCode);
    });

    socket.on("join-room", (data) => {

        const room = rooms[data.roomCode];

        if (!room) {
            socket.emit("error-message", "Room not found");
            return;
        }

        room.players.push({
            id: socket.id,
            nickname: data.nickname,
            score: 0
        });

        socket.join(data.roomCode);

        io.to(data.roomCode).emit("players-update", room.players);

        console.log(data.nickname + " joined room " + data.roomCode);
    });
    socket.on("start-game", (roomCode) => {

        const room = rooms[roomCode];

        if (!room) return;

        room.currentQuestion = 0;

        io.to(roomCode).emit(
            "new-question",
            questions[0]
        );

        console.log("Game started in room:", roomCode);
    });
    socket.on("submit-answer", (data) => {

        const room = rooms[data.roomCode];

        if (!room) return;

        const currentQuestion =
            questions[room.currentQuestion];

        const player =
            room.players.find(
                p => p.id === socket.id
            );

        if (!player) return;

        if (data.answer === currentQuestion.correct) {
            player.score += 1;
        }

        io.to(data.roomCode).emit(
            "players-update",
            room.players
        );

        room.currentQuestion++;

        if (room.currentQuestion < questions.length) {

            io.to(data.roomCode).emit(
                "new-question",
                questions[room.currentQuestion]
            );

        } else {

            io.to(data.roomCode).emit(
                "game-over",
                room.players
            );
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});