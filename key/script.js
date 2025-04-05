// Raspored zvona
const scheduleMorning = [
    { start: "08:00", end: "08:45" },
    { start: "08:50", end: "09:35" },
    { start: "09:50", end: "10:35" },
    { start: "10:40", end: "11:25" },
    { start: "11:30", end: "12:15" },
    { start: "12:20", end: "13:05" },
    { start: "13:10", end: "13:40" }
];

const scheduleAfternoon = [
    { start: "14:00", end: "14:45" },
    { start: "14:50", end: "15:35" },
    { start: "15:50", end: "16:35" },
    { start: "16:40", end: "17:25" },
    { start: "17:30", end: "18:15" },
    { start: "18:20", end: "19:05" },
    { start: "19:10", end: "19:40" }
];

// Raspored časova
const timetable = {
    "Ponedeljak": ["1ST", "1ST", "MAT", "MAT", "FIZIČKO", "GEO", "GEO"],
    "Utorak": ["OET", "OET", "FIZIKA", "HEM", "SRP", "SRP", ""],
    "Sreda": ["LIKOVNO FIZIKA", "MAT", "HEM", "FIZIČKO", "P N", "P N", "P N"],
    "Četvrtak": ["POTROŠ.", "SRP", "SRP", "OET", "OET", "OET", ""],
    "Petak": ["POTROŠ.", "POTROŠ.", "ENG", "ENG", "RAČ. i INF", "RAČ. i INF", "VER/GRAD"]
};

// Funkcija za slanje poruke
function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    // Dodaj korisnikovu poruku u chat
    const chatBox = document.getElementById("chatBox");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.innerHTML = `<p>${userInput}</p>`;
    chatBox.appendChild(userMessage);

    // Obradi pitanje i generiši odgovor
    const botResponse = processQuestion(userInput);
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.innerHTML = `<p>${botResponse}</p>`;
    chatBox.appendChild(botMessage);

    // Skroluj na dno
    chatBox.scrollTop = chatBox.scrollHeight;

    // Očisti polje za unos
    document.getElementById("userInput").value = "";
}

// Funkcija za obradu pitanja
function processQuestion(question) {
    question = question.toLowerCase();

    // Pitanja o zvonjenju
    if (question.includes("kada zvoni") || question.includes("vreme")) {
        return answerBellTime();
    }

    // Pitanja o sledećem času
    if (question.includes("sledeći čas") || question.includes("koji čas")) {
        return answerNextClass();
    }

    // Pitanja o učionicama
    if (question.includes("učionica") || question.includes("gde je")) {
        const classroomNumber = parseInt(question.match(/\d+/));
        if (classroomNumber) {
            return answerClassroomLocation(classroomNumber);
        }
    }

    return "Izvini, nisam razumeo tvoje pitanje. Možeš me pitati kada zvoni, koji je sledeći čas ili gde je određena učionica.";
}

// Funkcija za odgovor o zvonjenju
function answerBellTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    let schedule = currentTime < "14:00" ? scheduleMorning : scheduleAfternoon;

    for (let i = 0; i < schedule.length; i++) {
        if (currentTime >= schedule[i].start && currentTime <= schedule[i].end) {
            return `Trenutno je ${i + 1}. čas, traje od ${schedule[i].start} do ${schedule[i].end}.`;
        }
    }

    return "Trenutno nema časova. Pogledaj raspored zvona za više informacija.";
}

// Funkcija za odgovor o sledećem času
function answerNextClass() {
    const now = new Date();
    const day = now.getDay(); // 1 je Ponedeljak, 2 je Utorak, itd.
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const days = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
    const currentDay = days[day];

    if (day === 0 || day === 6) {
        return "Danas je vikend, nema časova.";
    }

    let schedule = currentTime < "14:00" ? scheduleMorning : scheduleAfternoon;

    for (let i = 0; i < schedule.length; i++) {
        if (currentTime >= schedule[i].start && currentTime <= schedule[i].end) {
            const nextClassIndex = i + 1;
            if (nextClassIndex < schedule.length) {
                const subject = timetable[currentDay][nextClassIndex];
                if (subject) {
                    return `Sledeći čas je ${subject}, počinje u ${schedule[nextClassIndex].start}.`;
                } else {
                    return "Nema više časova za danas.";
                }
            }
        }
    }

    return "Trenutno nema časova. Pogledaj raspored za sledeći dan.";
}

// Funkcija za odgovor o lokaciji učionice
function answerClassroomLocation(classroomNumber) {
    if (classroomNumber >= 1 && classroomNumber <= 15) {
        return `Učionica ${classroomNumber} se nalazi na 1. spratu.`;
    } else if (classroomNumber > 15 && classroomNumber <= 25) {
        return `Učionica ${classroomNumber} se nalazi na 2. spratu.`;
    } else if (classroomNumber > 25 && classroomNumber <= 38) {
        return `Učionica ${classroomNumber} se nalazi na 3. spratu.`;
    } else {
        return "Nisam siguran gde se nalazi ta učionica. Proveri broj učionice i pokušaj ponovo.";
    }
}
