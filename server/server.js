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
        question: "What was the name of the mysterious website with strange cryptic puzzles?",
        answers: ["Cicada 3301", "DeepSeek", "NullNet", "DarkRoot"],
        correct: "Cicada 3301"
    },
    {
        question: "Which browser is most associated with accessing the dark web?",
        answers: ["Chrome", "Safari", "Tor", "Opera"],
        correct: "Tor"
    },
    {
        question: "What does VPN stand for?",
        answers: [
            "Virtual Private Network",
            "Verified Protocol Node",
            "Virtual Public Network",
            "Visual Proxy Net"
        ],
        correct: "Virtual Private Network"
    },
    {
        question: "Which company created the Linux kernel?",
        answers: ["Microsoft", "Apple", "Linus Torvalds", "IBM"],
        correct: "Linus Torvalds"
    },
    {
        question: "What is phishing?",
        answers: [
            "A fishing simulator",
            "A hacking technique using fake messages",
            "A type of encryption",
            "A browser extension"
        ],
        correct: "A hacking technique using fake messages"
    },
    {
        question: "Which famous malware damaged Iran’s nuclear program?",
        answers: ["WannaCry", "ILOVEYOU", "Stuxnet", "Zeus"],
        correct: "Stuxnet"
    },
    {
        question: "What is the Deep Web?",
        answers: [
            "The entire internet",
            "Unindexed content not found on search engines",
            "Only illegal websites",
            "A gaming network"
        ],
        correct: "Unindexed content not found on search engines"
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            "HyperText Transfer Protocol",
            "HighText Transfer Process",
            "Hyper Transfer Text Program",
            "Home Tool Transfer Protocol"
        ],
        correct: "HyperText Transfer Protocol"
    },
    {
        question: "Which hacker group became famous for Guy Fawkes masks?",
        answers: ["GhostSec", "Lizard Squad", "Anonymous", "BlackEnergy"],
        correct: "Anonymous"
    },
    {
        question: "What is a brute-force attack?",
        answers: [
            "A DDoS attack",
            "Guessing passwords repeatedly",
            "Destroying hardware",
            "Physical hacking"
        ],
        correct: "Guessing passwords repeatedly"
    },
    {
        question: "Which protocol secures websites with encryption?",
        answers: ["FTP", "HTTP", "HTTPS", "SMTP"],
        correct: "HTTPS"
    },
    {
        question: "What is malware?",
        answers: [
            "Malicious software",
            "A computer monitor",
            "A Linux tool",
            "A network cable"
        ],
        correct: "Malicious software"
    },
    {
        question: "What is doxxing?",
        answers: [
            "Compressing files",
            "Publishing private information online",
            "Deleting servers",
            "Encrypting passwords"
        ],
        correct: "Publishing private information online"
    },
    {
        question: "Which social engineering tactic creates panic or urgency?",
        answers: ["Phishing", "Baiting", "Scareware", "Fork bombing"],
        correct: "Scareware"
    },
    {
        question: "What is a CAPTCHA mainly used for?",
        answers: [
            "Streaming video",
            "Stopping bots",
            "Encrypting data",
            "Tracking cookies"
        ],
        correct: "Stopping bots"
    },
    {
        question: "Which operating system is most used on servers?",
        answers: ["Linux", "Windows XP", "DOS", "Android"],
        correct: "Linux"
    },
    {
        question: "What does DDoS mean?",
        answers: [
            "Direct Data Operating System",
            "Distributed Denial of Service",
            "Dynamic Database Output Service",
            "Digital Domain Server"
        ],
        correct: "Distributed Denial of Service"
    },
    {
        question: "Which file extension is commonly executable on Windows?",
        answers: [".jpg", ".exe", ".png", ".txt"],
        correct: ".exe"
    },
    {
        question: "What is ransomware?",
        answers: [
            "Software demanding payment to unlock data",
            "A browser update",
            "An antivirus",
            "A cloud service"
        ],
        correct: "Software demanding payment to unlock data"
    },
    {
        question: "Which password is strongest?",
        answers: [
            "123456",
            "password",
            "qwerty",
            "X9!mQ2#Lp7@"
        ],
        correct: "X9!mQ2#Lp7@"
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
