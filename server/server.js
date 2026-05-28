@@ -19,19 +19,159 @@ const io = new Server(server, {
const rooms = {};
   const questions = [
    {
        question: "Who is the main ruler of the Dark Domain?",
        answers: [
            "Ferin",
            "Lugen XII",
            "Exmer",
            "Enceris"
        ],
        correct: "Lugen XII"
    },

    {
        question: "Why does Ferin attack the Dark Citadel?",
        answers: [
            "To rescue Alice",
            "To steal magical artifacts",
            "To avenge Ezeek and restore its glory",
            "To become a battle mage"
        ],
        correct: "To avenge Ezeek and restore its glory"
    },

    {
        question: "Who is Alice?",
        answers: [
            "A Temple Priest",
            "Lugen’s daughter",
            "Ferin’s sister",
            "A mercenary"
        ],
        correct: "Lugen’s daughter"
    },

    {
        question: "What kind of person is Lugen?",
        answers: [
            "Emotional and impulsive",
            "Cowardly and weak",
            "Strategic and highly intelligent",
            "Naive and idealistic"
        ],
        correct: "Strategic and highly intelligent"
    },

    {
        question: "What does the Priest in the party specialize in?",
        answers: [
            "Necromancy",
            "Sword fighting",
            "Battle magic",
            "Archery"
        ],
        correct: "Battle magic"
    },

    {
        question: "What happens when the party first attacks Lugen?",
        answers: [
            "Lugen escapes",
            "The Hero defeats him",
            "Lugen effortlessly stops them",
            "The castle guards kill the Priest"
        ],
        correct: "Lugen effortlessly stops them"
    },

    {
        question: "What is the Judgment of All Gods?",
        answers: [
            "A military council",
            "A magical ritual of judgment",
            "A royal execution",
            "A secret organization"
        ],
        correct: "A magical ritual of judgment"
    },

    {
        question: "What verdict do the All Gods give?",
        answers: [
            "Ferin must die",
            "Alice becomes queen immediately",
            "Lugen must step down",
            "The Dark Legions are disbanded"
        ],
        correct: "Lugen must step down"
    },

    {
        question: "Why does Lugen believe Ezeek became prosperous?",
        answers: [
            "Because of advanced science",
            "Because of peaceful trade",
            "Because of piracy and raids",
            "Because of magical resources"
        ],
        correct: "Because of piracy and raids"
    },

    {
        question: "What relation exists between Alice and Ferin?",
        answers: [
            "They are enemies",
            "They are secretly engaged",
            "They are siblings",
            "They are rivals"
        ],
        correct: "They are secretly engaged"
    },

    {
        question: "Who is Exmer?",
        answers: [
            "A battle mage",
            "A member of the Hero’s party",
            "Lugen’s servant and spy",
            "The ruler of Ezeek"
        ],
        correct: "Lugen’s servant and spy"
    },

    {
        question: "How does Lugen describe the Dark Legions?",
        answers: [
            "Mindless slaves",
            "Poorly trained soldiers",
            "Professional and loyal army",
            "Mercenaries without honor"
        ],
        correct: "Professional and loyal army"
    },

    {
        question: "Why did Alice originally leave home?",
        answers: [
            "She hated Ferin",
            "She wanted treasure",
            "She felt emotionally neglected",
            "She was kidnapped"
        ],
        correct: "She felt emotionally neglected"
    },

    {
        question: "What is unusual about Ferin’s upbringing?",
        answers: [
            "He was raised by pirates",
            "He spent most of his life outside Ezeek",
            "He lived in the Dark Citadel",
            "He trained with demons"
        ],
        correct: "He spent most of his life outside Ezeek"
    },

    {
        question: "What does the mercenary mainly use in combat?",
        answers: [
            "A spear",
            "A magic staff",
            "A crossbow",
            "Twin swords"
        ],
        correct: "A crossbow"
    },

    {
        question: "What does Lugen value more than fear?",
        answers: [
            "Chaos",
            "Revenge",
            "Competence",
            "Tradition"
        ],
        correct: "Competence"
    },

    {
        question: "Why did the Priest join Ferin’s mission?",
        answers: [
            "He wanted gold",
            "He hated Alice",
            "He was desperate and disillusioned",
            "He wanted to conquer Ezeek"
        ],
        correct: "He was desperate and disillusioned"
    },

    {
        question: "What theme is central to the story?",
        answers: [
            "Pure good versus evil",
            "Comedy about knights",
            "Political realism and moral complexity",
            "Romantic fantasy adventure"
        ],
        correct: "Political realism and moral complexity"
    },

    {
        question: "How does Lugen react to losing power?",
        answers: [
            "He panics",
            "He accepts it calmly",
            "He starts a war immediately",
            "He escapes the kingdom"
        ],
        correct: "He accepts it calmly"
    },

    {
        question: "What is the tone of the story?",
        answers: [
            "Lighthearted comedy",
            "Dark satire and deconstruction of fantasy tropes",
            "Children’s fairy tale",
            "Simple heroic adventure"
        ],
        correct: "Dark satire and deconstruction of fantasy tropes"
    }
];

@@ -153,4 +293,4 @@ io.on("connection", (socket) => {

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
});
