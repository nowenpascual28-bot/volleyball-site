/* ========= Central data: realistic matches (sample) ========= */
const sampleMatches = [
{
id: "m1",
teamA: "SpikeForce",
teamB: "PowerHit",
scoreA: 22,
scoreB: 20,
sets: "2-1",
venue: "Mall Arena"
},
{
id: "m2",
teamA: "Horizon",
teamB: "Titan",
scoreA: 18,
scoreB: 19,
sets: "1-2",
venue: "City Coliseum"
},
{
id: "m3",
teamA: "Coastal VC",
teamB: "Metro Spikers",
scoreA: 12,
scoreB: 8,
sets: "0-0",
venue: "Provincial Gym"
}
];

/* ====== Helper: render preview on homepage (if present) ====== */
function renderPreview() {
const previewEl = document.getElementById("preview-match");
if (!previewEl) return;
// pick top match (first sample)
const m = sampleMatches[0];
previewEl.innerHTML = `
<div class="card" style="background:transparent;padding:10px;">
<strong>${m.teamA}</strong> <span style="color:var(--muted)">vs</span> <strong>${m.teamB}</strong>
<div style="margin-top:8px">
<span style="font-size:1.4rem;font-weight:800">${m.scoreA}</span>
<span style="margin:0 8px;color:var(--muted)">-</span>
<span style="font-size:1.4rem;font-weight:800">${m.scoreB}</span>
</div>
<div style="margin-top:6px;color:var(--muted);font-size:0.95rem">${m.sets} • ${m.venue}</div>
</div>
`;
}

/* ====== Training form (index) ====== */
const trainingForm = document.getElementById("training-form");
if (trainingForm) {
trainingForm.addEventListener("submit", (e) => {
e.preventDefault();
const goal = document.getElementById("goal").value;
const output = document.getElementById("generated-routine");
const routines = {
strength: "Push-ups (3x15), Dumbbell Press (3x12), Core Planks (3x1min), Shoulder Rotations.",
cardio: "Sprint Intervals (5 rounds), Agility Ladder (10 min), Side Shuffles (3 sets), Jump Rope (5 min).",
jump: "Box Jumps (4x10), Squats (4x12), Lunges (3x15), Calf Raises (3x20).",
skills: "Spike Drills (20 reps), Setting Practice (3 sets of 10), Serving Accuracy (5 rounds)."
};
output.innerHTML = `<div class="card"><strong>${goal.charAt(0).toUpperCase()+goal.slice(1)} Routine:</strong><p style="color:var(--muted);margin-top:6px">${routines[goal]}</p></div>`;
});
}

/* ====== Score logic for scoring.html ====== */
function renderMatches() {
const container = document.getElementById("matches-container");
if (!container) return;
container.innerHTML = "";
sampleMatches.forEach((m) => {
const matchEl = document.createElement("div");
matchEl.className = "match card";
matchEl.innerHTML = `
<div class="teams">
<div class="team-card">
<h4>${m.teamA}</h4>
<div id="${m.id}-scoreA" class="score-display">${m.scoreA}</div>
</div>
<div style="text-align:center">
<div style="color:var(--muted)">${m.sets}</div>
<div style="color:var(--muted);font-size:0.95rem">${m.venue}</div>
</div>
<div class="team-card">
<h4>${m.teamB}</h4>
<div id="${m.id}-scoreB" class="score-display">${m.scoreB}</div>
</div>
</div>

<div class="match-controls">
<button class="small-btn" onclick="addPointMatch('${m.id}','A')">+1 ${m.teamA}</button>
<button class="small-btn" onclick="addPointMatch('${m.id}','B')">+1 ${m.teamB}</button>
<button class="small-btn red" onclick="forceWin('${m.id}')">Force Win</button>
<button class="reset-btn" onclick="resetMatch('${m.id}')">Reset</button>
</div>

<div id="${m.id}-winner" style="margin-top:8px;color:#88ffb0;font-weight:800"></div>
`;
container.appendChild(matchEl);
});
}

/* find match by id */
function findMatch(id) {
return sampleMatches.find(m => m.id === id);
}

/* update scoreboard display */
function updateMatchDisplay(id) {
const m = findMatch(id);
if (!m) return;
const aEl = document.getElementById(`${id}-scoreA`);
const bEl = document.getElementById(`${id}-scoreB`);
const winEl = document.getElementById(`${id}-winner`);
if (aEl) aEl.textContent = m.scoreA;
if (bEl) bEl.textContent = m.scoreB;
if (winEl) {
if (m.winner) winEl.textContent = `${m.winner} wins the set! 🏆`;
else winEl.textContent = "";
}
// also update homepage preview (keeps sync)
renderPreview();
}

/* rules: first to >=25 and 2-pt lead */
function checkWinnerForMatch(m) {
if ((m.scoreA >= 25 || m.scoreB >= 25) && Math.abs(m.scoreA - m.scoreB) >= 2) {
m.winner = m.scoreA > m.scoreB ? m.teamA : m.teamB;
}
}

/* add point */
function addPointMatch(id, team) {
const m = findMatch(id);
if (!m) return;
if (m.winner) return; // already finished
if (team === 'A') m.scoreA++;
else m.scoreB++;
checkWinnerForMatch(m);
updateMatchDisplay(id);
}

/* force win (for demo) */
function forceWin(id) {
const m = findMatch(id);
if (!m) return;
// make winner with 25-23 or similar
if (m.scoreA >= m.scoreB) {
m.scoreA = Math.max(25, m.scoreA);
m.scoreB = Math.max(m.scoreA - 2, m.scoreB);
} else {
m.scoreB = Math.max(25, m.scoreB);
m.scoreA = Math.max(m.scoreB - 2, m.scoreA);
}
checkWinnerForMatch(m);
updateMatchDisplay(id);
}

/* reset match */
function resetMatch(id) {
const m = findMatch(id);
if (!m) return;
m.scoreA = 0; m.scoreB = 0; m.winner = null;
updateMatchDisplay(id);
}

/* initial render on pages */
document.addEventListener("DOMContentLoaded", () => {
renderPreview();
renderMatches();
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
navMenu.classList.toggle('open');
});