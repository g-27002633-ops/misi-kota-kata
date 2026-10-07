const missions = [
  {
    name: "Misi 1 — Hutan Sinonim",
    stage: "HUTAN SINONIM",
    type: "SINONIM",
    icon: "🌿",
    intro: "Cari perkataan yang sama atau hampir sama maksud untuk membuka Gerbang Daun.",
    reward: "Daun Hikmah + 1 nyawa",
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
    name: "Misi 2 — Sungai Antonim",
    stage: "SUNGAI ANTONIM",
    type: "ANTONIM",
    icon: "🌊",
    intro: "Cari perkataan berlawanan maksud untuk menyeberangi Sungai Antonim.",
    reward: "Kristal Air + 1 nyawa",
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
    name: "Misi 3 — Gunung Makna",
    stage: "GUNUNG MAKNA",
    type: "BOSS BATTLE",
    icon: "⛰️",
    intro: "Raja Keliru menunggu di puncak. Kenal pasti sinonim dan antonim berdasarkan konteks ayat.",
    reward: "Mahkota Rimba Kata",
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

const $ = id => document.getElementById(id);
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
  window.scrollTo({top:0,behavior:"smooth"});
}

function shuffle(arr){
  const copy = [...arr];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function tone(freq=440,duration=.12,type="sine"){
  try{
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type=type;
    osc.frequency.value=freq;
    gain.gain.value=.045;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(()=>{osc.stop();ctx.close()},duration*1000);
  }catch(e){}
}

function playCorrect(){
  tone(520,.10,"triangle");
  setTimeout(()=>tone(690,.10,"triangle"),100);
  setTimeout(()=>tone(870,.12,"triangle"),195);
}
function playWrong(){
  tone(190,.18,"sawtooth");
  setTimeout(()=>tone(150,.12,"sawtooth"),130);
}
function playVictory(){
  [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.18,"triangle"),i*130));
}

function resetGame(){
  missionIndex=0;questionIndex=0;score=0;lives=3;combo=0;bestCombo=0;correct=0;wrong=0;answered=false;
  missions.forEach(m=>m.questions=shuffle(m.questions));
}

function startGame(){
  resetGame();
  $("playerInfo").textContent=`${player.name} • ${player.cls}`;
  showScreen("game");
  renderQuestion();
}

function renderQuestion(){
  answered=false;
  const mission=missions[missionIndex];
  const q=mission.questions[questionIndex];

  $("missionName").textContent=mission.name;
  $("stageIcon").textContent=mission.icon;
  $("stageLabel").textContent=mission.stage;
  $("missionType").textContent=mission.type;
  $("questionCount").textContent=`Soalan ${questionIndex+1} / ${mission.questions.length}`;
  $("questionText").textContent=q.q;

  $("questionHint").textContent=
    missionIndex===0
      ? "Pilih perkataan yang sama atau hampir sama maksud."
      : missionIndex===1
      ? "Pilih perkataan yang berlawanan maksud."
      : "Boss Battle: baca konteks ayat dengan teliti.";

  $("lives").textContent=lives;
  $("score").textContent=score;
  $("combo").textContent=combo;
  $("feedback").textContent="";
  $("feedback").className="feedback";
  $("nextBtn").classList.add("hidden");

  const total=missions.reduce((n,m)=>n+m.questions.length,0);
  const prev=missions.slice(0,missionIndex).reduce((n,m)=>n+m.questions.length,0);
  $("progressBar").style.width=`${((prev+questionIndex)/total)*100}%`;

  const grid=$("answerGrid");
  grid.innerHTML="";
  shuffle(q.o).forEach(option=>{
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="answer-btn";
    btn.textContent=option;
    btn.addEventListener("click",()=>selectAnswer(btn,option,q.a));
    grid.appendChild(btn);
  });
}

function selectAnswer(btn,selected,answer){
  if(answered)return;
  answered=true;

  const buttons=[...document.querySelectorAll(".answer-btn")];
  buttons.forEach(b=>b.disabled=true);

  if(selected===answer){
    btn.classList.add("correct");
    combo++;
    bestCombo=Math.max(bestCombo,combo);
    const bonus=Math.min(combo-1,5)*2;
    score+=10+bonus;
    correct++;

    $("feedback").textContent=
      bonus>0
        ? `✅ Tepat! +10 mata dan +${bonus} bonus combo.`
        : "✅ Tepat! Jejak ekspedisi diteruskan.";
    $("feedback").classList.add("good");
    playCorrect();
  }else{
    btn.classList.add("wrong");
    buttons.forEach(b=>{
      if(b.textContent===answer)b.classList.add("correct");
    });
    wrong++;
    combo=0;
    lives=Math.max(0,lives-1);

    $("feedback").textContent=`❌ Belum tepat. Jawapan yang betul ialah “${answer}”.`;
    $("feedback").classList.add("bad");
    playWrong();
  }

  $("lives").textContent=lives;
  $("score").textContent=score;
  $("combo").textContent=combo;
  $("nextBtn").classList.remove("hidden");
}

function advance(){
  const mission=missions[missionIndex];

  if(questionIndex<mission.questions.length-1){
    questionIndex++;
    renderQuestion();
    return;
  }

  if(missionIndex<missions.length-1){
    $("transitionBadge").textContent="KAWASAN SELESAI";
    $("transitionTitle").textContent=
      missionIndex===0
        ? "Gerbang Daun Terbuka!"
        : "Sungai Antonim Berjaya Diseberangi!";
    $("transitionText").textContent=missions[missionIndex+1].intro;
    $("transitionIcon").textContent=missionIndex===0?"🌿✨":"🌊💎";
    $("rewardText").textContent=mission.reward;
    showScreen("transition");
    return;
  }

  finishGame();
}

function continueMission(){
  missionIndex++;
  questionIndex=0;
  lives=Math.min(3,lives+1);
  showScreen("game");
  renderQuestion();
}

function finishGame(){
  const total=correct+wrong;
  const accuracy=total?Math.round((correct/total)*100):0;
  const comboBonus=Math.min(bestCombo*2,20);
  const final=Math.min(100,Math.round(accuracy*.85+comboBonus*.75));

  let rank="Pengembara Rimba";
  let msg="Teruskan berlatih. Setiap ekspedisi menjadikan penguasaan kata kamu semakin kuat.";

  if(final>=90){
    rank="Legenda Rimba Kata";
    msg="Luar biasa! Kamu benar-benar menguasai sinonim dan antonim.";
  }else if(final>=75){
    rank="Wira Rimba Kata";
    msg="Hebat! Raja Keliru berjaya ditewaskan dan Rimba Kata kembali aman.";
  }else if(final>=60){
    rank="Penjaga Rimba Kata";
    msg="Bagus! Sedikit lagi untuk mencapai tahap Wira Rimba Kata.";
  }

  $("resultPlayer").textContent=`${player.name} • ${player.cls}`;
  $("finalScore").textContent=final;
  $("rankBadge").textContent=rank;
  $("resultMessage").textContent=msg;
  $("correctTotal").textContent=correct;
  $("wrongTotal").textContent=wrong;
  $("bestCombo").textContent=bestCombo;

  playVictory();
  showScreen("result");
}

$("playerForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("playerName").value.trim();
  const cls=$("playerClass").value.trim();
  if(!name||!cls)return;
  player={name,cls};
  startGame();
});

$("nextBtn").addEventListener("click",advance);
$("continueBtn").addEventListener("click",continueMission);
$("restartBtn").addEventListener("click",()=>showScreen("start"));
