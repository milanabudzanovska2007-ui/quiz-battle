@@ -19,19 +19,159 @@ const io = new Server(server, {
const rooms = {};
const questions = [
    {
        question: "Capital of France?",
        answers: ["London", "Paris", "Berlin", "Madrid"],
        correct: "Paris"
        question: "What was the name of the mysterious website with strange cryptic puzzles?",
        answers: ["Cicada 3301", "DeepSeek", "NullNet", "DarkRoot"],
        correct: "Cicada 3301"
    },
    {
        question: "2 + 2 = ?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
        question: "Which browser is most associated with accessing the dark web?",
        answers: ["Chrome", "Safari", "Tor", "Opera"],
        correct: "Tor"
    },
    {
        question: "Color of the sky?",
        answers: ["Blue", "Green", "Red", "Yellow"],
        correct: "Blue"
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

@@ -153,4 +293,4 @@ io.on("connection", (socket) => {

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
});
