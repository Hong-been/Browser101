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


window.addEventListener('load',startGame);
replayBtn.addEventListener('click',()=>window.location.reload());
pauseBtn.addEventListener('click',()=>{
  if(!isPaused){
    timerObj.pause();
    pauseBtn.innerHTML=`<i class="fas fa-play"></i>`;
  }
  else{
    timerObj.resume();
    pauseBtn.innerHTML=`<i class="fas fa-pause"></i>`;
  }
  isPaused=!isPaused;
});
stage.addEventListener('click',event=>{
  const {target}=event;
  if(!target.classList.contains("carrot")) return;
  target.remove();
  counter.innerText-=1;
  if(counter.innerText==0){
    resultMessage.innerText=winMessage;
    endGame(winMessage);
  }
});

function startGame(){
  result.style.zIndex="-1";
  result.style.opacity=0;
  counter.innerText=10;
  pauseBtn.innerHTML=`<i class="fas fa-pause"></i>`;
  timerObj.start();
  showRandomItems();
}
function endGame(){
  timerObj.pause();
  result.style.zIndex="1";
  result.style.opacity=1;
}
function showRandomItems(){
  const {width,height}=stage.getBoundingClientRect();
  let string='';

  for(let i=0;i<counter.innerText;i++){
    const random=(max)=>Math.floor(Math.random() * max);
    const top=random(height);
    const left=random(width);
    string+=`<img class="item carrot" src="img/carrot.png" style="transform:translate(${left}px,${top}px)">`;
  }
  for(let i=0;i<counter.innerText;i++){
    const random=(max)=>Math.floor(Math.random() * max);
    const top=random(height);
    const left=random(width);
    string+=`<img class="item bug" src="img/bug.png" style="transform:translate(${left}px,${top}px)">`;
  }
  stage.innerHTML+=string;
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