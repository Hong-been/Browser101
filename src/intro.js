'use strict';
const introText=`Start to Catch<br />
<strong>🥕ALL CARROTS🥕</strong><br />
Avoiding Bugs!`;

export default class Intro{
  constructor(){
    this.header = document.querySelector(".header");
    this.header.classList.remove("header--hide");

    this.introPopUp = document.querySelector(".intro");
    this.introText=document.querySelector(".intro__txt");
    this.introPopUpBtn = document.querySelector(".intro__play");

    this.introText.innerHTML=introText;
    this.introPopUpBtn.addEventListener("click", ()=>{
      this.hide();
      this.onClick && this.onClick();
    });

  }
  setClickListner(onClick){
    this.onClick=onClick;
  }

  show=()=>{
    this.introPopUp.classList.remove("intro--hide");
  }

  hide(){
    this.introPopUp.classList.add("intro--hide");
  }
}
