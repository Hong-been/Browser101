'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field{
  constructor(carrotCount,bugCount){
    this.carrotCount=carrotCount;
    this.bugCount=bugCount;
    this.field = document.querySelector(".field");
    this.fieldRect=this.field.getBoundingClientRect();
    this.field.addEventListener('click',this.onClick);
  }
  setClickListner(onItemClick){
    this.onItemClick=onItemClick;
  }

  init(){
    this.field.innerHTML="";
    this._addItem("carrot", "img/carrot.png");
    this._addItem("bug", "img/bug.png");
  }

  _addItem(className, imgPath) {
    this.width = this.fieldRect.width - CARROT_SIZE;
    this.height = this.fieldRect.height - CARROT_SIZE;
    this.fragment = new DocumentFragment();
  
    for (let i = 0; i < this.carrotCount; i++) {
      this.top = random(this.height);
      this.left = random(this.width);
  
      this.item = document.createElement("img");
      this.item.setAttribute("src", imgPath);
      this.item.setAttribute("class", className);
      this.item.setAttribute("draggable", false);
      this.item.style.transform = `translate(${this.left}px,${this.top}px)`;

      this.fragment.appendChild(this.item);
    }
    this.field.appendChild(this.fragment);
  }
  
  hide(){
    this.field.classList.add("field--hide");
  }

  show(){
    this.field.classList.remove("field--hide");
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")){
      sound.playCarrot();
      target.remove();
      console.log(this.onItemClick);
      this.onItemClick && this.onItemClick('carrot');
    }else if (target.matches(".bug")) {
      sound.playBug();
      this.onItemClick && this.onItemClick('bug');
    }
  } 
}

function random(max){
  return Math.floor(Math.random() * max);
}

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}