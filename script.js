// 題目與影片
const stages = [
  { title:"第一題", question:"題目：近期一起看過的爆紅影集女主角的名字是什麼？", hints:["1.捨不得追完","2.溫柔的力量藏在※每一筆※","3.兩顆心，各自跳動卻注定相連，把它們的力量合起來，就是愛的密碼。"], answer:"453", video:"HBD.mp4" },
  { title:"第二題", question:"「總會出現這麼一個人，他會讓你覺得，成年人也可以相信童話。」-桑延<br><br>「我想奮不顧身一次，不考慮任何事情，奔向那個人。」-溫以凡<br><br>題目：你最喜歡的環保杯上面是誰？", hints:["1.她跟你一樣，集漂亮、可愛於一身，就像童話","2.她的名字","3.大膽的把它拆開再重組，就像童話裡勇敢追尋愛的她。"], answer:"418", video:"DoIt.mp4" },
  { title:"第三題", question:"「我親手抓住你的陰影，從此以後，你的世界，就只剩下光了。」-桑延<br><br>題目：當我們混在人群裡，第一次一起看的那部愛情電影的導演，叫什麼？", hints:["1.故事裡，有人為愛，穿越生死，只為了讓她再次相信幸福。","2.電影裡，有一條誰都看不見、卻牢牢牽住兩個人的紅線。","3.每一筆，都是一次心動的瞬間，細細累積後，像命運悄悄織起的紅線。不是心動不再，而是妳知道——我一直都在。那片交織成網的紅線，是我接住你的方式"], answer:"272", video:"ByMySelf.mp4" },
  { title:"第四題", question:"「如果你覺得說這些話很矯情的話，以後就我來說吧。」-溫以凡<br><br>我曾害怕海的聲音<br>覺得它充滿孤單與悲傷。<br>但是遇見妳後<br>海浪不再讓我害怕<br>它變得溫柔、像妳、像依靠、像家。<br>我想把這份勇氣說出口<br>把心交給妳<br>即使妳覺得矯情<br>也希望妳能聽到我最真摯的心意。<br>而命運用筆替我們留下的數字，就是這一關的密碼。<br><br>題目：讓我不再害怕海，也讓我敢把心說出口的話，這一關的密碼是什麼？", hints:["1.三個字","2.最簡單的心意","3.粗暴簡單、老掉牙"], answer:"520", video:"LetMe.mp4" }
];
let currentStage = 0;

// 題目渲染
function renderStage(){
  const stage = stages[currentStage];
  const app = document.getElementById("app");

  app.innerHTML = `
    <h1>Happy Birthday</h1><br>
    <h2>${stage.title}</h2>
    <p>${stage.question}</p>
    <button onclick="showHint()">幫幫我</button>
    <br>
    <input id="answerInput" type="number" placeholder="輸入三位數密碼" />
    <button onclick="checkAnswer()">確認密碼</button>
    <div id="videoBox"></div>
    <div id="nextBtnBox"></div>
  `;
}

// 顯示提示
function showHint(){
  const stage = stages[currentStage];
  const hintBox = document.getElementById("hintBox");
  hintBox.style.display = "block";
  hintBox.querySelector("#hint1").textContent = stage.hints[0];
  hintBox.querySelector("#hint2").textContent = stage.hints[1];
  hintBox.querySelector("#hint3").textContent = stage.hints[2];

  const hints = hintBox.querySelectorAll(".hint");
  let currentHint = 0;
  hints[currentHint].classList.add("active");
  clearInterval(window.hintInterval);
  window.hintInterval = setInterval(()=>{
    hints.forEach(h => h.classList.remove("active"));
    hints[currentHint].classList.add("active");
    currentHint = (currentHint + 1) % hints.length;
  },2300);
}

// 關閉提示
function closeHint(){
  document.getElementById("hintBox").style.display = "none";
  clearInterval(window.hintInterval);
}

// ----------------------
// 錯誤提示
// ----------------------
function showError(msg){
  const box = document.getElementById("errorBox");
  const content = document.getElementById("errorContent");
  content.textContent = msg;
  box.style.display = "block";

  // 使用 class 切換控制淡入
  setTimeout(()=>{ box.classList.add("active"); }, 10);

  clearTimeout(window.errorTimeout);
  window.errorTimeout = setTimeout(()=>{ closeError(); },3000);
}

function closeError(){
  const box = document.getElementById("errorBox");
  box.classList.remove("active");
  setTimeout(()=>{ box.style.display="none"; },500);
}


// 答案檢查
function checkAnswer(){
  const input = document.getElementById("answerInput").value;
  const stage = stages[currentStage];

  if(input === stage.answer){
    playVideo(stage.video);
  } else {
    showError("密碼錯誤，再試試看！");
  }
}

// 影片播放與下一關
function playVideo(src){
  const overlay = document.createElement("div");
  overlay.id = "videoOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0"; overlay.style.left="0";
  overlay.style.width="100%"; overlay.style.height="100%";
  overlay.style.background="rgba(0,0,0,0.75)";
  overlay.style.display="flex"; overlay.style.alignItems="center"; overlay.style.justifyContent="center";
  overlay.style.zIndex="9998";

  const video = document.createElement("video");
  video.src = src;
  video.id="videoPlayer";
  video.style.maxWidth="360px";
  video.style.width="90%";
  video.style.borderRadius="16px";
  video.autoplay = true;
  video.controls = true;
  video.style.opacity=0;
  video.style.transition="opacity 1.2s";

  overlay.appendChild(video);
  document.body.appendChild(overlay);

  setTimeout(()=>{ video.style.opacity=1; },50);

  video.onended = ()=>{
    video.style.opacity=0;
    setTimeout(()=>{ document.body.removeChild(overlay); showNextButton(); },1200);
  };
}

// 下一關按鈕或結束
function showNextButton(){
  const box = document.getElementById("nextBtnBox");
  if(currentStage === stages.length-1){
    box.innerHTML = "<h2 style='font-size: 1rem'>我害怕海，也害怕孤單。<br>我曾以為海浪的聲音，是世界把所有悲傷交給我的哭泣。<br>那是一種無助，一種說不出口的心酸。<br><br>直到遇見妳——海聲不再悲傷，心也不再漂蕩。<br>不是我變勇敢，是妳讓我安心。<br><br>妳讓那個曾叫人害怕的聲音，<br>變成世界上最溫柔的回響。<br>每一次的潮聲，都像妳的心跳，<br>拍進我的胸口，讓我踏實。<br><br>也因此，我開始期待——<br>有一天能過著平凡卻完美的日子：<br>茶餘飯後，牽著妳的手，<br>一起走到海邊散步。<br>通關!<br>生日快樂<br>我愛妳❤️</h2>";
  } else {
    box.innerHTML = `<button onclick="goNext()">前往下一關</button>`;
  }
}

// 換下一題
function goNext(){
  currentStage++;
  renderStage();
}

// ----------------------
// 背景泡泡生成
// ----------------------
const bubbleContainer = document.getElementById("bubbleContainer");
const colors = ["#ff8ba6","#74c7e7","#ffdce6","#c8ecff","#b89aff"];
for(let i=0;i<25;i++){
  const bubble = document.createElement("div");
  bubble.className="bubble";
  const size = Math.random()*20 +10;
  bubble.style.width = bubble.style.height = size+"px";
  bubble.style.left = Math.random()*100+"%";
  bubble.style.background = colors[Math.floor(Math.random()*colors.length)];
  bubble.style.animationDuration = (Math.random()*15+10)+"s";
  bubble.style.animationDelay = Math.random()*5+"s";
  bubbleContainer.appendChild(bubble);
}

// 初始化
renderStage();
