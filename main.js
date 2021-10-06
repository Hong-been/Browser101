'use strict';

const CARROT_SIZE=80;
const WINNER="🤩 WOW! YOU WIN! 🤩";
const ITEM_COUNT=10;
const DURATION_SEC=5;

const introWindow=document.querySelector(".intro");
const playBtn=document.querySelector(".intro__play");
const timer=document.querySelector(".header__timer");
const result=document.querySelector(".field__result");
const replayBtn=document.querySelector(".result__replay");
const resultMessage=document.querySelector(".result__message");
const counter=document.querySelector(".header__remaining");
const pauseBtn=document.querySelector(".pause");
const field=document.querySelector(".field__items");
let isPaused=false;

const bgSound=new Audio("./sound/bg.mp3");
const bugSound=new Audio("./sound/bug_pull.mp3");
const carrotSound=new Audio("./sound/carrot_pull.mp3");
const winSound=new Audio("./sound/game_win.mp3");
const alertSound=new Audio("./sound/alert.wav");

window.addEventListener('load',()=>{
  counter.innerText=ITEM_COUNT;
  addItem('carrot',ITEM_COUNT,'img/carrot.png');
  addItem('bug',ITEM_COUNT,'img/bug.png');
  playBtn.addEventListener('click',startGame);
});

function controlPause(){
  timer.classList.toggle("hidden");
  field.classList.toggle("hidden");
  if(!isPaused){
    timerObj.pause();
    field.removeEventListener('click',removeItem);
    pauseBtn.innerHTML=`<i class="fas fa-play"></i>`;
    bgSound.pause();
    playAudio(alertSound);
  }
  else{
    timerObj.resume();
    field.addEventListener('click',removeItem);
    pauseBtn.innerHTML=`<i class="fas fa-pause"></i>`;
    playAudio(bgSound);
  }
  isPaused=!isPaused;
}
function removeItem(event){
  const {target}=event;
  if(target.tagName!="IMG") return;
  if(target.classList.contains("bug")) {
    playAudio(bugSound);
    return;
  }
  target.remove();
  playAudio(carrotSound);
  counter.innerText-=1;
  if(counter.innerText==0){
    resultMessage.innerText=WINNER;
    endGame(true);
  }
}
function playAudio(audio){
  audio.currentTime=0;
  audio.play();
}

function startGame(){
  replayBtn.addEventListener('click',()=>window.location.reload());
  pauseBtn.addEventListener('click',controlPause);
  field.addEventListener('click',removeItem);

  pauseBtn.classList.remove("hidden");
  counter.classList.remove("hidden");
  timer.classList.remove("hidden");
  field.classList.remove("hidden");
  
  introWindow.classList.toggle("hidden");
  playAudio(bgSound);
  timerObj.start();
  
  field.childNodes.forEach(item=>{
    if(item.tagName!='IMG') return;
    item.addEventListener('mouseenter',()=>{
      item.classList.toggle("bigger");
    console.log(item);})
    item.addEventListener('mouseleave',()=>{
      item.classList.toggle("bigger");})
  }
  );
}
function endGame(isWinning){
  field.removeEventListener('click',removeItem);
  pauseBtn.removeEventListener('click',controlPause);
  playBtn.removeEventListener('click',startGame);

  bgSound.pause();
  timerObj.pause();
  result.classList.toggle("hidden");
  if(isWinning) playAudio(winSound);
  else playAudio(alertSound);
}
function addItem(className,num,imgPath){
  const width=field.getBoundingClientRect().width-CARROT_SIZE;
  const height=field.getBoundingClientRect().height-CARROT_SIZE;
  const fragment = new DocumentFragment();

  for(let i=0;i<num;i++){
    const random=(max)=>Math.floor(Math.random() * max);
    const top=random(height);
    const left=random(width);
    
    const item=document.createElement('img');
    item.setAttribute('src',imgPath);
    item.setAttribute('class',className);
    item.style.transform=`translate(${left}px,${top}px) scale(1.0)`;
    fragment.appendChild(item);
  }
  field.appendChild(fragment);
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
      this.callBack(false);
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
const timerObj=new Timer(DURATION_SEC,timer,endGame);