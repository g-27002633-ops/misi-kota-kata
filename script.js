const missions = [
  {
    name: "Misi 1 — Hutan Sinonim",
    stage: "SINONIM",
    intro: "Cari perkataan yang sama atau hampir sama maksud untuk membuka Gerbang Sinonim.",
    questions: [
      { q: "Apakah sinonim bagi perkataan “gembira”?", a: "riang", o: ["sedih","riang","marah","sunyi"] },
      { q: "Apakah sinonim bagi perkataan “cantik”?", a: "indah", o: ["hodoh","indah","keras","gelap"] },
      { q: "Apakah sinonim bagi perkataan “bijak”?", a: "pandai", o: ["malas","lambat","pandai","lemah"] },
      { q: "Apakah sinonim bagi perkataan “cepat”?", a: "pantas", o: ["pantas","perlahan","diam","jauh"] },
      { q: "Apakah sinonim bagi perkataan “marah”?", a: "murka", o: ["ceria","murka","tenang","takut"] },
      { q: "Apakah sinonim bagi perkataan “rajin”?", a: "tekun", o: ["tekun","lalai","degil","kasar"] },
      { q: "Apakah sinonim bagi perkataan “besar”?", a: "luas", o: ["sempit","kecil","luas","nipis"] },
      { q: "Apakah sinonim bagi perkataan “sunyi”?", a: "sepi", o: ["riuh","sepi","sibuk","cerah"] },
      { q: "Apakah sinonim bagi perkataan “sukar”?", a: "susah", o: ["mudah","susah","ringan","senang"] },
      { q: "Apakah sinonim bagi perkataan “membantu”?", a: "menolong", o: ["menghalang","menolong","memarahi","menjauh"] }
    ]
  },
  {
    name: "Misi 2 — Gua Antonim",
    stage: "ANTONIM",
    intro: "Cari perkataan yang berlawanan maksud untuk menyalakan Kristal Antonim.",
    questions: [
      { q: "Apakah antonim bagi perkataan “tinggi”?", a: "rendah", o: ["rendah","besar","jauh","panjang"] },
      { q: "Apakah antonim bagi perkataan “panas”?", a: "sejuk", o: ["hangat","sejuk","kering","terik"] },
      { q: "Apakah antonim bagi perkataan “awal”?", a: "lewat", o: ["cepat","mula","lewat","segera"] },
      { q: "Apakah antonim bagi perkataan “keras”?", a: "lembut", o: ["kuat","tajam","lembut","tebal"] },
      { q: "Apakah antonim bagi perkataan “berani”?", a: "takut", o: ["takut","gagah","yakin","hebat"] },
      { q: "Apakah antonim bagi perkataan “rajin”?", a: "malas", o: ["tekun","malas","aktif","cekap"] },
      { q: "Apakah antonim bagi perkataan “bersih”?", a: "kotor", o: ["kemas","kotor","cantik","wangi"] },
      { q: "Apakah antonim bagi perkataan “masuk”?", a: "keluar", o: ["naik","keluar","duduk","datang"] },
      { q: "Apakah antonim bagi perkataan “hidup”?", a: "mati", o: ["sihat","mati","bangun","aktif"] },
      { q: "Apakah antonim bagi perkataan “jauh”?", a: "dekat", o: ["tinggi","dekat","luas","panjang"] }
    ]
  },
  {
    name: "Misi 3 — Istana Raja Keliru",
    stage: "BOSS BATTLE",
    intro: "Kenal pasti sinonim atau antonim berdasarkan konteks ayat. Kalahkan Raja Keliru!",
    questions: [
      { q: "Aisyah sangat gembira menerima hadiah. Perkataan yang sama maksud dengan “gembira” ialah...", a: "riang", o: ["riang","muram","takut","marah"] },
      { q: "Laluan itu sangat sempit. Perkataan berlawanan maksud dengan “sempit” ialah...", a: "luas", o: ["kecil","luas","pendek","gelap"] },
      { q: "Hakim seorang murid yang bijak. Sinonim bagi “bijak” ialah...", a: "pandai", o: ["lemah","pandai","degil","malas"] },
      { q: "Air teh itu masih panas. Antonim bagi “panas” ialah...", a: "sejuk", o: ["hangat","sejuk","pekat","manis"] },
      { q: "Suasana di perpustakaan itu sunyi. Sinonim bagi “sunyi” ialah...", a: "sepi", o: ["bising","sepi","sibuk","ceria"] },
      { q: "Amir tiba awal ke sekolah. Antonim bagi “awal” ialah...", a: "lewat", o: ["cepat","lewat","segera","mula"] },
      { q: "Nadia rajin menyiapkan latihan. Sinonim bagi “rajin” ialah...", a: "tekun", o: ["malas","tekun","lemah","kasar"] },
      { q: "Bilik itu sangat bersih. Antonim bagi “bersih” ialah...", a: "kotor", o: ["kemas","cantik","kotor","wangi"] },
      { q: "Bas itu bergerak dengan cepat. Sinonim bagi “cepat” ialah...", a: "pantas", o: ["perlahan","pantas","berhenti","lambat"] },
      { q: "Budak itu berani tampil ke hadapan. Antonim bagi “berani” ialah...", a: "takut", o: ["gagah","yakin","takut","kuat"] }
    ]
  }
];

const $ = (id) => document.getElementById(id);

const screens = {
  start: $("startScreen"),
  game: $("gameScreen"),
  transition: $("transitionScreen"),
  result: $("resultScreen")
};

let player = { name:"", cls:"" };
let missionIndex = 0;
let questionIndex = 0;
let score = 0;
let lives = 3;
let combo = 0;
let bestCombo = 0;
let correct = 0;
let wrong = 0;
let answered = false;

function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function shuffle(arr){
  const copy = [...arr];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function tone(freq=440, duration=0.12, type="sine"){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, duration * 1000);
  }catch(e){}
}

function resetGame(){
  missionIndex = 0;
  questionIndex = 0;
  score = 0;
  lives = 3;
  combo = 0;
  bestCombo = 0;
  correct = 0;
  wrong = 0;
  answered = false;
  missions.forEach(m => m.questions = shuffle(m.questions));
}

function startGame(){
  resetGame();
  $("playerInfo").textContent = `${player.name} • ${player.cls}`;
  showScreen("game");
  renderQuestion();
}

function renderQuestion(){
  answered = false;
  const mission = missions[missionIndex];
  const question = mission.questions[questionIndex];

  $("missionName").textContent = mission.name;
  $("stageLabel").textContent = mission.stage;
  $("questionCount").textContent = `Soalan ${questionIndex + 1} / ${mission.questions.length}`;
  $("questionText").textContent = question.q;
  $("questionHint").textContent =
    missionIndex === 0 ? "Pilih perkataan yang sama atau hampir sama maksud." :
    missionIndex === 1 ? "Pilih perkataan yang berlawanan maksud." :
    "Boss Battle: baca ayat dengan teliti.";
  $("lives").textContent = lives;
  $("score").textContent = score;
  $("combo").textContent = combo;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("nextBtn").classList.add("hidden");

  const totalQuestions = missions.reduce((n,m)=>n+m.questions.length,0);
  const completedBefore = missions.slice(0, missionIndex).reduce((n,m)=>n+m.questions.length,0);
  const completedNow = completedBefore + questionIndex;
  $("progressBar").style.width = `${(completedNow / totalQuestions) * 100}%`;

  const grid = $("answerGrid");
  grid.innerHTML = "";
  shuffle(question.o).forEach(option => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option, question.a));
    grid.appendChild(btn);
  });
}

function selectAnswer(btn, selected, answer){
  if(answered) return;
  answered = true;

  const buttons = [...document.querySelectorAll(".answer-btn")];
  buttons.forEach(b => b.disabled = true);

  if(selected === answer){
    btn.classList.add("correct");
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    const bonus = Math.min(combo - 1, 5) * 2;
    score += 10 + bonus;
    correct += 1;
    $("feedback").textContent = bonus > 0
      ? `✅ Betul! +10 mata +${bonus} bonus combo.`
      : "✅ Betul! +10 mata.";
    $("feedback").classList.add("good");
    tone(720,0.12,"triangle");
    setTimeout(()=>tone(900,0.10,"triangle"),110);
  }else{
    btn.classList.add("wrong");
    buttons.forEach(b => {
      if(b.textContent === answer) b.classList.add("correct");
    });
    wrong += 1;
    combo = 0;
    lives = Math.max(0, lives - 1);
    $("feedback").textContent = `❌ Belum tepat. Jawapan betul: ${answer}.`;
    $("feedback").classList.add("bad");
    tone(180,0.22,"sawtooth");
  }

  $("lives").textContent = lives;
  $("score").textContent = score;
  $("combo").textContent = combo;
  $("nextBtn").classList.remove("hidden");
}

function advance(){
  const mission = missions[missionIndex];

  if(questionIndex < mission.questions.length - 1){
    questionIndex++;
    renderQuestion();
    return;
  }

  if(missionIndex < missions.length - 1){
    $("transitionBadge").textContent = "Misi Selesai";
    $("transitionTitle").textContent = missionIndex === 0 ? "Gerbang Sinonim Dibuka!" : "Kristal Antonim Menyala!";
    $("transitionText").textContent = missions[missionIndex + 1].intro;
    $("transitionIcon").textContent = missionIndex === 0 ? "🌲✨" : "💎⚔️";
    showScreen("transition");
    return;
  }

  finishGame();
}

function continueMission(){
  missionIndex++;
  questionIndex = 0;
  lives = Math.min(3, lives + 1);
  showScreen("game");
  renderQuestion();
}

function finishGame(){
  const total = correct + wrong;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const comboBonus = Math.min(bestCombo * 2, 20);
  const final = Math.min(100, Math.round(accuracy * 0.85 + comboBonus * 0.75));

  let rank = "Pengembara Kata";
  let msg = "Teruskan latihan. Setiap misi menjadikan kamu lebih hebat!";
  if(final >= 90){ rank = "Legenda Kota Kata"; msg = "Luar biasa! Penguasaan sinonim dan antonim kamu sangat mantap."; }
  else if(final >= 75){ rank = "Wira Kota Kata"; msg = "Hebat! Kamu berjaya menewaskan Raja Keliru."; }
  else if(final >= 60){ rank = "Penjaga Kata"; msg = "Bagus! Sedikit lagi untuk menjadi Wira Kota Kata."; }

  $("resultTitle").textContent = "Kota Kata Diselamatkan!";
  $("resultPlayer").textContent = `${player.name} • ${player.cls}`;
  $("finalScore").textContent = final;
  $("rankBadge").textContent = rank;
  $("resultMessage").textContent = msg;
  $("correctTotal").textContent = correct;
  $("wrongTotal").textContent = wrong;
  $("bestCombo").textContent = bestCombo;
  $("progressBar").style.width = "100%";
  tone(523,0.12,"triangle");
  setTimeout(()=>tone(659,0.12,"triangle"),140);
  setTimeout(()=>tone(784,0.18,"triangle"),280);
  showScreen("result");
}

$("playerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("playerName").value.trim();
  const cls = $("playerClass").value.trim();
  if(!name || !cls) return;
  player = { name, cls };
  startGame();
});

$("nextBtn").addEventListener("click", advance);
$("continueBtn").addEventListener("click", continueMission);
$("restartBtn").addEventListener("click", () => showScreen("start"));
