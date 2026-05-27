import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://quiz-battle-jzvi.onrender.com");


function App() {

    const [nickname, setNickname] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [players, setPlayers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("room-created", (code) => {
            console.log("ROOM CREATED", code);

            setRoomCode(code);
        });

        socket.on("players-update", (updatedPlayers) => {
            socket.on("new-question", (question) => {
                socket.on("game-over", () => {
                    setGameOver(true);
                });
                setCurrentQuestion(question);
            });
            console.log("PLAYERS UPDATE", updatedPlayers);

            setPlayers(updatedPlayers);
        });

        socket.on("error-message", (message) => {
            alert(message);
        });

        return () => {
            socket.off("room-created");
            socket.off("players-update");
        };

    }, []);

    const createRoom = () => {

        if (!nickname) {
            alert("Enter nickname");
            return;
        }

        socket.emit("create-room", nickname);
    };

    const joinRoom = () => {

        if (!nickname) {
            alert("Enter nickname");
            return;
        }

        if (!joinCode) {
            alert("Enter room code");
            return;
        }

        socket.emit("join-room", {
            nickname: nickname,
            roomCode: joinCode
        });
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0f172a",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial"
        }}>

            <div style={{
                background: "#1e293b",
                padding: "40px",
                borderRadius: "20px",
                width: "400px",
                boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                textAlign: "center"
            }}>

                <h1 style={{
                    marginBottom: "30px",
                    fontSize: "42px"
                }}>
                    Quiz Battle
                </h1>

                <input
                    type="text"
                    placeholder="Enter nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        border: "none",
                        fontSize: "16px"
                    }}
                />

                <button
                    onClick={createRoom}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Create Room
                </button>

                <input
                    type="text"
                    placeholder="Enter room code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        border: "none",
                        fontSize: "16px"
                    }}
                />

                <button
                    onClick={joinRoom}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Join Room
                </button>

                {(roomCode || joinCode) && (
                    <>
                        <div style={{
                            marginBottom: "20px",
                            fontSize: "20px",
                            fontWeight: "bold"
                        }}>
                            Room: {roomCode || joinCode}
                        </div>

                        <button
                            onClick={() =>
                                socket.emit(
                                    "start-game",
                                    roomCode || joinCode
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginBottom: "25px",
                                background: "#f59e0b",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                        >
                            Start Game
                        </button>
                    </>
                )}

                <div style={{
                    background: "#334155",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "25px"
                }}>

                    <h2>Players</h2>

                    {players.map((player, index) => (
                        <div
                            key={index}
                            style={{
                                marginTop: "10px",
                                fontSize: "18px"
                            }}
                        >
                            {player.nickname} — {player.score}
                        </div>
                    ))}
                </div>

                {currentQuestion && !gameOver && (
                    <div>

                        <h2 style={{
                            marginBottom: "20px"
                        }}>
                            {currentQuestion.question}
                        </h2>

                        {currentQuestion.answers.map((answer, index) => (
                            <button
                                key={index}

                                onClick={() =>
                                    socket.emit("submit-answer", {
                                        roomCode: roomCode || joinCode,
                                        answer: answer
                                    })
                                }

                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    marginBottom: "12px",
                                    background: "#475569",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "16px",
                                    cursor: "pointer"
                                }}
                            >
                                {answer}
                            </button>
                        ))}

                    </div>
                )}

                {gameOver && (
                    <div>

                        <h1 style={{
                            color: "#22c55e"
                        }}>
                            GAME OVER
                        </h1>

                        <h2>
                            Winner:
                        </h2>

                        <div style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                        }}>
                            {
                                [...players]
                                    .sort((a, b) => b.score - a.score)[0]
                                    ?.nickname
                            }
                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default App;
