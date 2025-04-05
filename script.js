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

// Map day names
const days = {
    "Ponedeljak": "Monday",
    "Utorak": "Tuesday",
    "Sreda": "Wednesday",
    "Četvrtak": "Thursday",
    "Petak": "Friday"
};

// Basic timetable structure (you'll need to fill this with your actual data)
const timetable = {
    "Ponedeljak": ["Matematika", "Fizika", "Engleski", "Istorija", "Geografija"],
    "Utorak": ["Srpski", "Biologija", "Hemija", "Fizičko", "Likovno"],
    "Sreda": ["Matematika", "Informatika", "Engleski", "Istorija", "Fizika"],
    "Četvrtak": ["Srpski", "Hemija", "Biologija", "Fizičko", "Geografija"],
    "Petak": ["Matematika", "Engleski", "Informatika", "Likovno", "Fizika"]
};

// Classroom locations (example)
const classrooms = {
    "Matematika": "Učionica 15, prizemlje",
    "Fizika": "Kabinet fizike, drugi sprat",
    "Engleski": "Učionica 7, prvi sprat",
    "Istorija": "Učionica 12, prvi sprat",
    "Geografija": "Kabinet geografije, prizemlje",
    "Srpski": "Učionica 3, prizemlje",
    "Biologija": "Kabinet biologije, drugi sprat",
    "Hemija": "Laboratorija hemije, drugi sprat",
    "Fizičko": "Fiskulturna sala, posebna zgrada",
    "Likovno": "Kabinet likovnog, treći sprat",
    "Informatika": "Računarski kabinet, prizemlje"
};

// Initialize user input event listener
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('userInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add current timestamp to the first message
    updateTimestamps();
});

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const text = userInput.value.trim();
    
    if (text === '') return;
    
    // Add user message
    addMessage(text, 'user');
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process the message and respond after a short delay
    setTimeout(() => {
        const response = processUserInput(text);
        hideTypingIndicator();
        addMessage(response, 'bot');
    }, 1500);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="timestamp">Danas, ${timeString}</div>
    `;
    
    // Insert before typing indicator
    const typingIndicator = document.getElementById('typingIndicator');
    chatBox.insertBefore(messageDiv, typingIndicator);
    
    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'block';
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'none';
}

function updateTimestamps() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    document.querySelectorAll('.timestamp').forEach(timestamp => {
        if (timestamp.textContent.includes('Danas')) {
            timestamp.textContent = `Danas, ${timeString}`;
        }
    });
}

function processUserInput(text) {
    text = text.toLowerCase();
    
    // Check current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    
    // Get current day
    const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    const currentDay = days[now.getDay()];
    
    // Determine if morning or afternoon shift
    const isMorning = currentHour < 14;
    const schedule = isMorning ? scheduleMorning : scheduleAfternoon;
    
    // Check for bell schedule query
    if (text.includes('zvoni') || text.includes('zvono')) {
        let response = `Trenutno je ${currentDay}, ${currentTime}.\n\n`;
        
        // Find current or next period
        let currentPeriod = -1;
        for (let i = 0; i < schedule.length; i++) {
            const periodStart = schedule[i].start;
            const periodEnd = schedule[i].end;
            
            if (currentTime >= periodStart && currentTime <= periodEnd) {
                currentPeriod = i;
                const timeLeft = calculateTimeLeft(currentTime, periodEnd);
                response += `Trenutno je ${i+1}. čas (${periodStart}-${periodEnd}).\nDo kraja časa preostalo je ${timeLeft}.`;
                break;
            } else if (i < schedule.length - 1 && currentTime > periodEnd && currentTime < schedule[i+1].start) {
                response += `Trenutno je mali odmor između ${i+1}. i ${i+2}. časa.\nSledeći čas počinje u ${schedule[i+1].start}.`;
                break;
            }
        }
        
        if (currentPeriod === -1 && currentTime < schedule[0].start) {
            response += `Časovi još nisu počeli. Prvi čas počinje u ${schedule[0].start}.`;
        } else if (currentPeriod === -1 && currentTime > schedule[schedule.length-1].end) {
            response += `Časovi su završeni za danas.`;
        }
        
        return response;
    }
    
    // Check for next class query
    if (text.includes('sledeći čas') || text.includes('sledeci cas')) {
        if (currentDay === 'Subota' || currentDay === 'Nedelja') {
            return "Danas je vikend, nema nastave.";
        }
        
        // Find current period
        let nextPeriodIndex = -1;
        for (let i = 0; i < schedule.length; i++) {
            if (currentTime < schedule[i].start) {
                nextPeriodIndex = i;
                break;
            }
        }
        
        if (nextPeriodIndex === -1) {
            return "Nema više časova danas.";
        }
        
        // Get next class from timetable
        const daySchedule = timetable[currentDay];
        if (!daySchedule || nextPeriodIndex >= daySchedule.length) {
            return `Sledeći čas je ${nextPeriodIndex + 1}. čas, počinje u ${schedule[nextPeriodIndex].start}.`;
        }
        
        const nextClass = daySchedule[nextPeriodIndex];
        return `Sledeći čas je ${nextClass}, počinje u ${schedule[nextPeriodIndex].start} (${nextPeriodIndex + 1}. čas).`;
    }
    
    // Check for classroom location query
    if (text.includes('gde je') || text.includes('učionica') || text.includes('ucionica') || text.includes('kabinet')) {
        for (const [subject, location] of Object.entries(classrooms)) {
            if (text.includes(subject.toLowerCase())) {
                return `${subject} se održava u lokaciji: ${location}.`;
            }
        }
        return "Nisam siguran gde se nalazi ta učionica. Možeš pitati za konkretne predmete, na primer 'Gde je kabinet fizike?'";
    }
    
    // Default response
    return "Nisam siguran kako da odgovorim na to. Možeš me pitati kada zvoni, koji je sledeći čas ili gde je određena učionica.";
}

function calculateTimeLeft(currentTime, endTime) {
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let minutesLeft = (endHour * 60 + endMinute) - (currentHour * 60 + currentMinute);
    
    if (minutesLeft <= 0) return "0 minuta";
    
    if (minutesLeft >= 60) {
        const hours = Math.floor(minutesLeft / 60);
        const minutes = minutesLeft % 60;
        return `${hours} sat${hours !== 1 ? 'a' : ''} i ${minutes} minut${minutes !== 1 ? 'a' : ''}`;
    }
    
    return `${minutesLeft} minut${minutesLeft !== 1 ? 'a' : ''}`;
}
