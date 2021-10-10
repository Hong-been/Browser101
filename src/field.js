'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field{
  constructor(carrotCount,bugCount){
    this.carrotCount=carrotCount;
    this.bugCount=bugCount;
    this.field = document.querySelector(".field");
    this.fieldRect=this.field.getBoundingClientRect();
  }

  setItemClickListner(onItemClick){
    this.onItemClick=onItemClick;
  }

  removeClickListner(){
    this.onClick && this.field.removeEventListener('click',this.onClick);
  }

  init(){
    this.field.addEventListener('click',this.onClick);
    this.field.innerHTML="";
    this._addItem("carrot", "img/carrot.png");
    this._addItem("bug", "img/bug.png");
    this.hide();
  }

  _addItem(className, imgPath) {
    this.rectWidth = this.fieldRect.width - CARROT_SIZE;
    this.rectHeight = this.fieldRect.height - CARROT_SIZE;
    this.fragment = new DocumentFragment();

    for (let i = 0; i < this.carrotCount; i++) {
      this.top = random(this.rectHeight);
      this.left = random(this.rectWidth);

      this.item = document.createElement("img");
      this.item.setAttribute("src", imgPath);
      this.item.setAttribute("class", className);
      this.item.setAttribute("draggable", false);
      this.item.style.top = `${this.top}px`;
      this.item.style.left = `${this.left}px`;

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

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")){
      sound.playCarrot();
      target.remove();
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
