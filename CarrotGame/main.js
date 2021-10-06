const timer=document.querySelector(".header__timer");
const result=document.querySelector(".result");
const replayBtn=document.querySelector(".result__replay");
const resultMessage=document.querySelector(".result__message");
const counter=document.querySelector(".header__remaining");
const pauseBtn=document.querySelector(".pause");
const stage=document.querySelector(".items");
const mins=0, secs=10, duration=mins*60+secs;
const winMessage="🤩 WOW! YOU WIN! 🤩";
let isPaused=false;
const bgSound=new Audio("./sound/bg.mp3");
const bugSound=new Audio("./sound/bug_pull.mp3");
const carrotSound=new Audio("./sound/carrot_pull.mp3");
const winSound=new Audio("./sound/game_win.mp3");
const alertSound=new Audio("./sound/alert.wav");

window.addEventListener('load',startGame);
replayBtn.addEventListener('click',()=>window.location.reload());
pauseBtn.addEventListener('click',()=>{
  if(!isPaused){
    timerObj.pause();
    stage.removeEventListener('click',removeItem);
    pauseBtn.innerHTML=`<i class="fas fa-play"></i>`;
    bgSound.pause();
    playAudio(alertSound);
  }
  else{
    timerObj.resume();
    stage.addEventListener('click',removeItem);
    pauseBtn.innerHTML=`<i class="fas fa-pause"></i>`;
    playAudio(bgSound);
  }
  isPaused=!isPaused;
});
stage.addEventListener('click',removeItem);

function removeItem(event){
  const {target}=event;
  if(!target.classList.contains("item")) return;
  if(target.classList.contains("bug")) {
    playAudio(bugSound);
    return;
  }
  target.remove();
  playAudio(carrotSound);
  counter.innerText-=1;
  if(counter.innerText==0){
    resultMessage.innerText=winMessage;
    endGame();
    playAudio(winSound);
  }
}
function playAudio(audio){
  audio.currentTime=0;
  audio.play();
}

function startGame(){
  playAudio(bgSound);
  result.style.zIndex="-1";
  result.style.opacity=0;
  counter.innerText=10;
  pauseBtn.innerHTML=`<i class="fas fa-pause"></i>`;
  timerObj.start();
  showRandomItems();

  const items=document.querySelectorAll(".item");
  items.forEach(item=>{
    item.addEventListener('mouseenter',()=>{
    item.style.transform+="scale(1.2)";})
    item.addEventListener('mouseleave',()=>{
      item.style.transform+="scale(0.8)";})
  }
  );
}
function endGame(){
  stage.removeEventListener('click',removeItem);
  bgSound.pause();
  timerObj.pause();
  result.style.zIndex="1";
  result.style.opacity=1;
}
function showRandomItems(){
  const {width,height}=stage.getBoundingClientRect();
  const fragment = new DocumentFragment();

  for(let i=0;i<counter.innerText;i++){
    const random=(max)=>Math.floor(Math.random() * max);
    const top=random(height);
    const left=random(width);
    
    const item=document.createElement('img');
    item.setAttribute('src','img/carrot.png');
    item.classList.add('item','carrot');
    item.style.transform=`translate(${left}px,${top}px)`;
    fragment.appendChild(item);
  }
  for(let i=0;i<counter.innerText;i++){
    const random=(max)=>Math.floor(Math.random() * max);
    const top=random(height);
    const left=random(width);

    const item=document.createElement('img');
    item.setAttribute('src','img/bug.png');
    item.classList.add('item','bug');
    item.style.transform=`translate(${left}px,${top}px)`;
    fragment.appendChild(item);
  }
  stage.appendChild(fragment);
}
class Timer{
  constructor(duration,display,printDone){
    this.duration=duration;
    this.display=display;
    this.callBack=printDone;
    this.state="running";
  }
  resume(){
    if(this.state==="paused" && !this.interval){
      this.state="running";
      this.interval=setInterval(()=>{this.update()},1000);
    }
  }
  pause(){
    this.state="paused";
    clearInterval(this.interval);
    this.interval=null;
  }
  update(){
    this.duration--;
    if(this.duration<=0){
      clearInterval(this.interval);
      this.interval=null;
      this.callBack("Done");
    }
    this.mins=`${parseInt(this.duration/60)}`;
    this.secs=`${this.duration%60}`;
    this.display.innerHTML=`${this.mins.padStart(2,'0')}:${this.secs.padStart(2,'0')}`;
  }
  start(){
    if(this.state==="running"){
      if(!this.interval){
        this.interval=setInterval(()=>{this.update()},1000);
      }
    }
  }
}
const timerObj=new Timer(duration,timer,endGame);