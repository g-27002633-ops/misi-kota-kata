const SHEET_API_URL="https://script.google.com/macros/s/AKfycbzMrVGByp5BwsmtHQJPC-Pm6dtw7AWFR6zSqvdaywU5QEkS89G0yFqu3cqjlm7twaP0/exec";

const missions=[
{
 name:"Misi 1 — Hutan Sinonim",stage:"HUTAN SINONIM",type:"SINONIM",icon:"🌿",totem:"🧚",
 intro:"Cari perkataan yang sama atau hampir sama maksud.",reward:"Daun Hikmah + 1 nyawa",
 questions:[
 ["Apakah sinonim bagi perkataan “gembira”?","riang",["sedih","riang","marah","sunyi"]],
 ["Apakah sinonim bagi perkataan “cantik”?","indah",["hodoh","indah","keras","gelap"]],
 ["Apakah sinonim bagi perkataan “bijak”?","pandai",["malas","lambat","pandai","lemah"]],
 ["Apakah sinonim bagi perkataan “cepat”?","pantas",["pantas","perlahan","diam","jauh"]],
 ["Apakah sinonim bagi perkataan “marah”?","murka",["ceria","murka","tenang","takut"]],
 ["Apakah sinonim bagi perkataan “rajin”?","tekun",["tekun","lalai","degil","kasar"]],
 ["Apakah sinonim bagi perkataan “besar”?","luas",["sempit","kecil","luas","nipis"]],
 ["Apakah sinonim bagi perkataan “sunyi”?","sepi",["riuh","sepi","sibuk","cerah"]],
 ["Apakah sinonim bagi perkataan “sukar”?","susah",["mudah","susah","ringan","senang"]],
 ["Apakah sinonim bagi perkataan “membantu”?","menolong",["menghalang","menolong","memarahi","menjauh"]]
 ]
},
{
 name:"Misi 2 — Sungai Antonim",stage:"SUNGAI ANTONIM",type:"ANTONIM",icon:"🌊",totem:"🧜‍♀️",
 intro:"Cari perkataan yang berlawanan maksud.",reward:"Kristal Air + 1 nyawa",
 questions:[
 ["Apakah antonim bagi perkataan “tinggi”?","rendah",["rendah","besar","jauh","panjang"]],
 ["Apakah antonim bagi perkataan “panas”?","sejuk",["hangat","sejuk","kering","terik"]],
 ["Apakah antonim bagi perkataan “awal”?","lewat",["cepat","mula","lewat","segera"]],
 ["Apakah antonim bagi perkataan “keras”?","lembut",["kuat","tajam","lembut","tebal"]],
 ["Apakah antonim bagi perkataan “berani”?","takut",["takut","gagah","yakin","hebat"]],
 ["Apakah antonim bagi perkataan “rajin”?","malas",["tekun","malas","aktif","cekap"]],
 ["Apakah antonim bagi perkataan “bersih”?","kotor",["kemas","kotor","cantik","wangi"]],
 ["Apakah antonim bagi perkataan “masuk”?","keluar",["naik","keluar","duduk","datang"]],
 ["Apakah antonim bagi perkataan “hidup”?","mati",["sihat","mati","bangun","aktif"]],
 ["Apakah antonim bagi perkataan “jauh”?","dekat",["tinggi","dekat","luas","panjang"]]
 ]
},
{
 name:"Misi 3 — Gunung Makna",stage:"GUNUNG MAKNA",type:"BOSS BATTLE",icon:"⛰️",totem:"👹",
 intro:"Kenal pasti sinonim atau antonim berdasarkan konteks ayat.",reward:"Mahkota Rimba Kata",
 questions:[
 ["Aisyah sangat gembira menerima hadiah. Sinonim “gembira” ialah...","riang",["riang","muram","takut","marah"]],
 ["Laluan itu sangat sempit. Antonim “sempit” ialah...","luas",["kecil","luas","pendek","gelap"]],
 ["Hakim seorang murid yang bijak. Sinonim “bijak” ialah...","pandai",["lemah","pandai","degil","malas"]],
 ["Air teh itu masih panas. Antonim “panas” ialah...","sejuk",["hangat","sejuk","pekat","manis"]],
 ["Suasana di perpustakaan itu sunyi. Sinonim “sunyi” ialah...","sepi",["bising","sepi","sibuk","ceria"]],
 ["Amir tiba awal ke sekolah. Antonim “awal” ialah...","lewat",["cepat","lewat","segera","mula"]],
 ["Nadia rajin menyiapkan latihan. Sinonim “rajin” ialah...","tekun",["malas","tekun","lemah","kasar"]],
 ["Bilik itu sangat bersih. Antonim “bersih” ialah...","kotor",["kemas","cantik","kotor","wangi"]],
 ["Bas itu bergerak dengan cepat. Sinonim “cepat” ialah...","pantas",["perlahan","pantas","berhenti","lambat"]],
 ["Budak itu berani tampil ke hadapan. Antonim “berani” ialah...","takut",["gagah","yakin","takut","kuat"]]
 ]
}
];

const $=id=>document.getElementById(id);
const screens={start:$("startScreen"),game:$("gameScreen"),transition:$("transitionScreen"),result:$("resultScreen")};

let player={name:"",cls:""};
let missionIndex=0,questionIndex=0,score=0,lives=3,combo=0,bestCombo=0,correct=0,wrong=0,answered=false;
let finalScoreValue=0,scoreSubmitted=false;

function showScreen(name){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function shuffle(arr){
  const copy=[...arr];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function tone(freq=440,duration=.12,type="sine"){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type=type;osc.frequency.value=freq;gain.gain.value=.045;
    osc.connect(gain);gain.connect(ctx.destination);osc.start();
    setTimeout(()=>{osc.stop();ctx.close()},duration*1000);
  }catch(e){}
}

function playCorrect(){tone(520,.10,"triangle");setTimeout(()=>tone(690,.10,"triangle"),100);setTimeout(()=>tone(870,.12,"triangle"),195)}
function playWrong(){tone(180,.2,"sawtooth")}
function playVictory(){[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.16,"triangle"),i*130))}

function resetGame(){
  missionIndex=0;questionIndex=0;score=0;lives=3;combo=0;bestCombo=0;correct=0;wrong=0;answered=false;
  finalScoreValue=0;scoreSubmitted=false;
  missions.forEach(m=>m.questions=shuffle(m.questions));
  $("submitScoreBtn").disabled=false;
  $("submitScoreBtn").textContent="📤 HANTAR MARKAH KEPADA GURU";
  $("submitStatus").textContent="Tekan butang di atas untuk menghantar markah.";
  $("submitStatus").className="submit-status";
}

function startGame(){
  resetGame();
  $("playerInfo").textContent=`${player.name} • ${player.cls}`;
  showScreen("game");
  renderQuestion();
}

function renderQuestion(){
  answered=false;
  const m=missions[missionIndex],q=m.questions[questionIndex];

  $("missionName").textContent=m.name;
  $("stageIcon").textContent=m.icon;
  $("stageLabel").textContent=m.stage;
  $("missionType").textContent=m.type;
  $("totem").textContent=m.totem;
  $("questionCount").textContent=`Soalan ${questionIndex+1} / ${m.questions.length}`;
  $("questionText").textContent=q[0];
  $("questionHint").textContent=m.intro;

  $("lives").textContent=lives;
  $("score").textContent=score;
  $("combo").textContent=combo;
  $("feedback").textContent="";
  $("feedback").className="feedback";
  $("nextBtn").classList.add("hidden");

  const total=missions.reduce((n,x)=>n+x.questions.length,0);
  const before=missions.slice(0,missionIndex).reduce((n,x)=>n+x.questions.length,0);
  $("progressBar").style.width=`${((before+questionIndex)/total)*100}%`;

  const grid=$("answerGrid");
  grid.innerHTML="";
  shuffle(q[2]).forEach(option=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="answer-btn";btn.textContent=option;
    btn.addEventListener("click",()=>selectAnswer(btn,option,q[1]));
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
    combo++;bestCombo=Math.max(bestCombo,combo);
    const bonus=Math.min(combo-1,5)*2;
    score+=10+bonus;correct++;
    $("feedback").textContent=bonus?`✅ Tepat! +10 mata +${bonus} bonus combo.`:"✅ Tepat! Jejak ekspedisi diteruskan.";
    $("feedback").classList.add("good");
    playCorrect();
  }else{
    btn.classList.add("wrong");
    buttons.forEach(b=>{if(b.textContent===answer)b.classList.add("correct")});
    wrong++;combo=0;lives=Math.max(0,lives-1);
    $("feedback").textContent=`❌ Belum tepat. Jawapan yang betul ialah “${answer}”.`;
    $("feedback").classList.add("bad");
    playWrong();
  }

  $("lives").textContent=lives;$("score").textContent=score;$("combo").textContent=combo;
  $("nextBtn").classList.remove("hidden");
}

function advance(){
  const m=missions[missionIndex];
  if(questionIndex<m.questions.length-1){
    questionIndex++;renderQuestion();return;
  }
  if(missionIndex<missions.length-1){
    $("transitionTitle").textContent=missionIndex===0?"Gerbang Daun Terbuka!":"Sungai Antonim Berjaya Diseberangi!";
    $("transitionText").textContent=missions[missionIndex+1].intro;
    $("transitionIcon").textContent=missionIndex===0?"🌿✨":"🌊💎";
    $("rewardText").textContent=m.reward;
    showScreen("transition");return;
  }
  finishGame();
}

function continueMission(){
  missionIndex++;questionIndex=0;lives=Math.min(3,lives+1);
  showScreen("game");renderQuestion();
}

function finishGame(){
  const total=correct+wrong;
  const accuracy=total?Math.round((correct/total)*100):0;
  const comboBonus=Math.min(bestCombo*2,20);
  finalScoreValue=Math.min(100,Math.round(accuracy*.85+comboBonus*.75));

  let rank="Pengembara Rimba";
  let msg="Teruskan berlatih. Setiap ekspedisi menjadikan penguasaan kata kamu semakin kuat.";
  if(finalScoreValue>=90){rank="Legenda Rimba Kata";msg="Luar biasa! Kamu benar-benar menguasai sinonim dan antonim."}
  else if(finalScoreValue>=75){rank="Wira Rimba Kata";msg="Hebat! Raja Keliru berjaya ditewaskan dan Rimba Kata kembali aman."}
  else if(finalScoreValue>=60){rank="Penjaga Rimba Kata";msg="Bagus! Sedikit lagi untuk mencapai tahap Wira Rimba Kata."}

  $("resultPlayer").textContent=`${player.name} • ${player.cls}`;
  $("finalScore").textContent=finalScoreValue;
  $("rankBadge").textContent=rank;
  $("resultMessage").textContent=msg;
  $("correctTotal").textContent=correct;
  $("wrongTotal").textContent=wrong;
  $("bestCombo").textContent=bestCombo;

  scoreSubmitted=false;
  $("submitScoreBtn").disabled=false;
  $("submitScoreBtn").textContent="📤 HANTAR MARKAH KEPADA GURU";
  $("submitStatus").textContent="Tekan butang di atas untuk menghantar markah.";
  $("submitStatus").className="submit-status";

  playVictory();
  showScreen("result");
}

async function submitScore(){
  if(scoreSubmitted)return;

  const btn=$("submitScoreBtn"),status=$("submitStatus");
  btn.disabled=true;
  btn.textContent="⏳ MENGHANTAR...";
  status.textContent="Sedang menghantar keputusan...";
  status.className="submit-status sending";

  const payload={
    nama:player.name,
    kelas:player.cls,
    markah:finalScoreValue,
    betul:correct,
    salah:wrong,
    combo:bestCombo
  };

  try{
    await fetch(SHEET_API_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    });

    scoreSubmitted=true;
    btn.textContent="✅ MARKAH TELAH DIHANTAR";
    status.textContent="✅ Markah telah dihantar kepada guru.";
    status.className="submit-status success";
    playCorrect();
  }catch(err){
    console.error(err);
    scoreSubmitted=false;
    btn.disabled=false;
    btn.textContent="🔁 CUBA HANTAR SEMULA";
    status.textContent="❌ Markah gagal dihantar. Semak internet dan cuba lagi.";
    status.className="submit-status error";
    playWrong();
  }
}

$("playerForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("playerName").value.trim(),cls=$("playerClass").value.trim();
  if(!name||!cls)return;
  player={name,cls};
  startGame();
});

$("nextBtn").addEventListener("click",advance);
$("continueBtn").addEventListener("click",continueMission);
$("submitScoreBtn").addEventListener("click",submitScore);
$("restartBtn").addEventListener("click",()=>{resetGame();showScreen("start")});
