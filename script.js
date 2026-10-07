const SHEET_API_URL="https://script.google.com/macros/s/AKfycbzMrVGByp5BwsmtHQJPC-Pm6dtw7AWFR6zSqvdaywU5QEkS89G0yFqu3cqjlm7twaP0/exec";

const missions=[
{
 name:"Hutan Sinonim",type:"MISI 1 • SINONIM",npc:"🧚",zone:"forest-zone",
 rewardTitle:"Gerbang Daun Terbuka!",rewardIcon:"🌿✨",loot:"+1 nyawa • Daun Hikmah",
 questions:[
 ["Sinonim bagi “gembira” ialah...","riang",["sedih","riang","marah","sunyi"]],
 ["Sinonim bagi “cantik” ialah...","indah",["hodoh","indah","keras","gelap"]],
 ["Sinonim bagi “bijak” ialah...","pandai",["malas","lambat","pandai","lemah"]],
 ["Sinonim bagi “cepat” ialah...","pantas",["pantas","perlahan","diam","jauh"]],
 ["Sinonim bagi “marah” ialah...","murka",["ceria","murka","tenang","takut"]],
 ["Sinonim bagi “rajin” ialah...","tekun",["tekun","lalai","degil","kasar"]],
 ["Sinonim bagi “besar” ialah...","luas",["sempit","kecil","luas","nipis"]],
 ["Sinonim bagi “sunyi” ialah...","sepi",["riuh","sepi","sibuk","cerah"]],
 ["Sinonim bagi “sukar” ialah...","susah",["mudah","susah","ringan","senang"]],
 ["Sinonim bagi “membantu” ialah...","menolong",["menghalang","menolong","memarahi","menjauh"]]
 ]
},
{
 name:"Sungai Antonim",type:"MISI 2 • ANTONIM",npc:"🧜‍♀️",zone:"river-zone",
 rewardTitle:"Sungai Antonim Ditawan!",rewardIcon:"🌊💎",loot:"+1 nyawa • Kristal Air",
 questions:[
 ["Antonim bagi “tinggi” ialah...","rendah",["rendah","besar","jauh","panjang"]],
 ["Antonim bagi “panas” ialah...","sejuk",["hangat","sejuk","kering","terik"]],
 ["Antonim bagi “awal” ialah...","lewat",["cepat","mula","lewat","segera"]],
 ["Antonim bagi “keras” ialah...","lembut",["kuat","tajam","lembut","tebal"]],
 ["Antonim bagi “berani” ialah...","takut",["takut","gagah","yakin","hebat"]],
 ["Antonim bagi “rajin” ialah...","malas",["tekun","malas","aktif","cekap"]],
 ["Antonim bagi “bersih” ialah...","kotor",["kemas","kotor","cantik","wangi"]],
 ["Antonim bagi “masuk” ialah...","keluar",["naik","keluar","duduk","datang"]],
 ["Antonim bagi “hidup” ialah...","mati",["sihat","mati","bangun","aktif"]],
 ["Antonim bagi “jauh” ialah...","dekat",["tinggi","dekat","luas","panjang"]]
 ]
},
{
 name:"Gunung Makna",type:"MISI 3 • BOSS BATTLE",npc:"👹",zone:"boss-zone",
 rewardTitle:"Raja Keliru Tewas!",rewardIcon:"👑⚔️",loot:"Mahkota Rimba Kata",
 questions:[
 ["Aisyah sangat gembira. Sinonim “gembira” ialah...","riang",["riang","muram","takut","marah"]],
 ["Laluan itu sempit. Antonim “sempit” ialah...","luas",["kecil","luas","pendek","gelap"]],
 ["Hakim murid yang bijak. Sinonim “bijak” ialah...","pandai",["lemah","pandai","degil","malas"]],
 ["Air teh itu panas. Antonim “panas” ialah...","sejuk",["hangat","sejuk","pekat","manis"]],
 ["Perpustakaan itu sunyi. Sinonim “sunyi” ialah...","sepi",["bising","sepi","sibuk","ceria"]],
 ["Amir tiba awal. Antonim “awal” ialah...","lewat",["cepat","lewat","segera","mula"]],
 ["Nadia rajin menyiapkan latihan. Sinonim “rajin” ialah...","tekun",["malas","tekun","lemah","kasar"]],
 ["Bilik itu sangat bersih. Antonim “bersih” ialah...","kotor",["kemas","cantik","kotor","wangi"]],
 ["Bas bergerak dengan cepat. Sinonim “cepat” ialah...","pantas",["perlahan","pantas","berhenti","lambat"]],
 ["Budak itu berani ke hadapan. Antonim “berani” ialah...","takut",["gagah","yakin","takut","kuat"]]
 ]
}
];

const $=id=>document.getElementById(id);
let player={name:"",cls:""},mi=0,qi=0,score=0,life=3,combo=0,best=0,correct=0,wrong=0,locked=false;
const screens={start:$("start"),game:$("game"),transition:$("transition"),result:$("result")};

function show(id){Object.values(screens).forEach(s=>s.classList.remove("active"));screens[id].classList.add("active");window.scrollTo(0,0)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function tone(f,d=.12,type="triangle"){try{let c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.type=type;g.gain.value=.04;o.connect(g);g.connect(c.destination);o.start();setTimeout(()=>{o.stop();c.close()},d*1000)}catch(e){}}
function goodSound(){[520,700,900].forEach((f,i)=>setTimeout(()=>tone(f,.1),i*90))}
function badSound(){tone(170,.2,"sawtooth")}
function reset(){mi=qi=score=combo=best=correct=wrong=0;life=3;locked=false;missions.forEach(m=>m.questions=shuffle(m.questions))}
function updateNodes(){["node1","node2","node3"].forEach((id,i)=>{let n=$(id);n.classList.toggle("done",i<mi);n.classList.toggle("active",i===mi)})}

async function hantarKeGoogleSheet(markahAkhir){
  const payload={
    nama:player.name,
    kelas:player.cls,
    markah:markahAkhir,
    betul:correct,
    salah:wrong,
    combo:best
  };

  try{
    await fetch(SHEET_API_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    });
    console.log("Keputusan dihantar ke Google Sheets.");
  }catch(err){
    console.error("Gagal menghantar keputusan:",err);
  }
}

function render(){
 locked=false;
 let m=missions[mi],q=m.questions[qi];
 $("zoneScene").className="scene zone "+m.zone;
 $("playerNameHud").textContent=player.name;
 $("zoneName").textContent=m.name;
 $("life").textContent=life;$("score").textContent=score;$("combo").textContent=combo;
 $("npcEmoji").textContent=m.npc;$("stageType").textContent=m.type;$("question").textContent=q[0];
 $("hint").textContent=mi===0?"Cari perkataan yang sama atau hampir sama maksud.":mi===1?"Cari perkataan yang berlawanan maksud.":"Baca ayat dan pilih jawapan terbaik.";
 $("feedback").textContent="";$("feedback").className="feedback";$("nextBtn").classList.add("hidden");
 $("counter").textContent=`${qi+1} / ${m.questions.length}`;
 let total=missions.reduce((n,x)=>n+x.questions.length,0),before=missions.slice(0,mi).reduce((n,x)=>n+x.questions.length,0);
 $("progressFill").style.width=`${((before+qi)/total)*100}%`;
 updateNodes();
 let box=$("answers");box.innerHTML="";
 shuffle(q[2]).forEach(opt=>{
   let b=document.createElement("button");b.className="answer";b.textContent=opt;
   b.addEventListener("click",()=>answer(b,opt,q[1]));box.appendChild(b)
 })
}

function answer(btn,opt,ans){
 if(locked)return;locked=true;
 let bs=[...document.querySelectorAll(".answer")];bs.forEach(b=>b.disabled=true);
 if(opt===ans){
   btn.classList.add("correct");combo++;best=Math.max(best,combo);let bonus=Math.min(combo-1,5)*2;score+=10+bonus;correct++;
   $("feedback").textContent=bonus?`✅ Tepat! +10 mata +${bonus} combo.`:"✅ Tepat! Laluan terbuka."; $("feedback").classList.add("good");goodSound()
 }else{
   btn.classList.add("wrong");bs.forEach(b=>{if(b.textContent===ans)b.classList.add("correct")});wrong++;combo=0;life=Math.max(0,life-1);
   $("feedback").textContent=`❌ Belum tepat. Jawapan betul: ${ans}.`; $("feedback").classList.add("bad");badSound()
 }
 $("life").textContent=life;$("score").textContent=score;$("combo").textContent=combo;$("nextBtn").classList.remove("hidden")
}

function next(){
 let m=missions[mi];
 if(qi<m.questions.length-1){qi++;render();return}
 if(mi<missions.length-1){
   $("rewardIcon").textContent=m.rewardIcon;$("rewardTitle").textContent=m.rewardTitle;$("rewardText").textContent=`Kamu berjaya menamatkan ${m.name}.`;
   $("lootText").textContent=m.loot;show("transition");return
 }
 finish()
}

function continueGame(){mi++;qi=0;life=Math.min(3,life+1);show("game");render()}

function finish(){
 let total=correct+wrong,
     accuracy=total?Math.round(correct/total*100):0,
     final=Math.min(100,Math.round(accuracy*.88+Math.min(best*2,16)*.75));

 let rank="Pengembara Kata",msg="Teruskan latihan untuk menguasai rimba perkataan.";
 if(final>=90){rank="Legenda Rimba Kata";msg="Luar biasa! Kamu menguasai sinonim dan antonim dengan sangat baik."}
 else if(final>=75){rank="Wira Rimba Kata";msg="Hebat! Raja Keliru berjaya ditewaskan."}
 else if(final>=60){rank="Penjaga Rimba Kata";msg="Bagus! Sedikit lagi untuk menjadi Wira Rimba Kata."}

 $("finalPlayer").textContent=`${player.name} • ${player.cls}`;
 $("finalScore").textContent=final;
 $("rank").textContent=rank;
 $("finalMsg").textContent=msg;
 $("correct").textContent=correct;
 $("wrong").textContent=wrong;
 $("bestCombo").textContent=best;

 show("result");
 hantarKeGoogleSheet(final);

 [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.16),i*120))
}

$("playerForm").addEventListener("submit",e=>{
 e.preventDefault();
 player={name:$("nameInput").value.trim(),cls:$("classInput").value.trim()};
 if(!player.name||!player.cls)return;
 reset();show("game");render()
});
$("nextBtn").addEventListener("click",next);
$("continueBtn").addEventListener("click",continueGame);
$("restartBtn").addEventListener("click",()=>show("start"));
