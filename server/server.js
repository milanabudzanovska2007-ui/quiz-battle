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
const quizQuestions = [
  {
    question: "Who is the main ruler of the Dark Domain?",
    options: [
      "Ferin",
      "Lugen XII",
      "Exmer",
      "Enceris"
    ],
    answer: "Lugen XII"
  },

  {
    question: "Why does Ferin attack the Dark Citadel?",
    options: [
      "To rescue Alice",
      "To steal magical artifacts",
      "To avenge Ezeek and restore its glory",
      "To become a battle mage"
    ],
    answer: "To avenge Ezeek and restore its glory"
  },

  {
    question: "Who is Alice?",
    options: [
      "A Temple Priest",
      "Lugen’s daughter",
      "Ferin’s sister",
      "A mercenary"
    ],
    answer: "Lugen’s daughter"
  },

  {
    question: "What kind of person is Lugen?",
    options: [
      "Emotional and impulsive",
      "Cowardly and weak",
      "Strategic and highly intelligent",
      "Naive and idealistic"
    ],
    answer: "Strategic and highly intelligent"
  },

  {
    question: "What does the Priest in the party specialize in?",
    options: [
      "Necromancy",
      "Sword fighting",
      "Battle magic",
      "Archery"
    ],
    answer: "Battle magic"
  },

  {
    question: "What happens when the party first attacks Lugen?",
    options: [
      "Lugen escapes",
      "The Hero defeats him",
      "Lugen effortlessly stops them",
      "The castle guards kill the Priest"
    ],
    answer: "Lugen effortlessly stops them"
  },

  {
    question: "What is the Judgment of All Gods?",
    options: [
      "A military council",
      "A magical ritual of judgment",
      "A royal execution",
      "A secret organization"
    ],
    answer: "A magical ritual of judgment"
  },

  {
    question: "What verdict do the All Gods give?",
    options: [
      "Ferin must die",
      "Alice becomes queen immediately",
      "Lugen must step down",
      "The Dark Legions are disbanded"
    ],
    answer: "Lugen must step down"
  },

  {
    question: "Why does Lugen believe Ezeek became prosperous?",
    options: [
      "Because of advanced science",
      "Because of peaceful trade",
      "Because of piracy and raids",
      "Because of magical resources"
    ],
    answer: "Because of piracy and raids"
  },

  {
    question: "What relation exists between Alice and Ferin?",
    options: [
      "They are enemies",
      "They are secretly engaged",
      "They are siblings",
      "They are rivals"
    ],
    answer: "They are secretly engaged"
  },

  {
    question: "Who is Exmer?",
    options: [
      "A battle mage",
      "A member of the Hero’s party",
      "Lugen’s servant and spy",
      "The ruler of Ezeek"
    ],
    answer: "Lugen’s servant and spy"
  },

  {
    question: "How does Lugen describe the Dark Legions?",
    options: [
      "Mindless slaves",
      "Poorly trained soldiers",
      "Professional and loyal army",
      "Mercenaries without honor"
    ],
    answer: "Professional and loyal army"
  },

  {
    question: "Why did Alice originally leave home?",
    options: [
      "She hated Ferin",
      "She wanted treasure",
      "She felt emotionally neglected",
      "She was kidnapped"
    ],
    answer: "She felt emotionally neglected"
  },

  {
    question: "What is unusual about Ferin’s upbringing?",
    options: [
      "He was raised by pirates",
      "He spent most of his life outside Ezeek",
      "He lived in the Dark Citadel",
      "He trained with demons"
    ],
    answer: "He spent most of his life outside Ezeek"
  },

  {
    question: "What does the mercenary mainly use in combat?",
    options: [
      "A spear",
      "A magic staff",
      "A crossbow",
      "Twin swords"
    ],
    answer: "A crossbow"
  },

  {
    question: "What does Lugen value more than fear?",
    options: [
      "Chaos",
      "Revenge",
      "Competence",
      "Tradition"
    ],
    answer: "Competence"
  },

  {
    question: "Why did the Priest join Ferin’s mission?",
    options: [
      "He wanted gold",
      "He hated Alice",
      "He was desperate and disillusioned",
      "He wanted to conquer Ezeek"
    ],
    answer: "He was desperate and disillusioned"
  },

  {
    question: "What theme is central to the story?",
    options: [
      "Pure good versus evil",
      "Comedy about knights",
      "Political realism and moral complexity",
      "Romantic fantasy adventure"
    ],
    answer: "Political realism and moral complexity"
  },

  {
    question: "How does Lugen react to losing power?",
    options: [
      "He panics",
      "He accepts it calmly",
      "He starts a war immediately",
      "He escapes the kingdom"
    ],
    answer: "He accepts it calmly"
  },

  {
    question: "What is the tone of the story?",
    options: [
      "Lighthearted comedy",
      "Dark satire and deconstruction of fantasy tropes",
      "Children’s fairy tale",
      "Simple heroic adventure"
    ],
    answer: "Dark satire and deconstruction of fantasy tropes"
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
