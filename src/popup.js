'use strict';

export default class PopUp{
  constructor(){
    this.gamePopUp = document.querySelector(".popup");
    this.hide();
    this.gamePopUpTxt = document.querySelector(".popup__txt");
    this.gamePopUpBtn = document.querySelector(".popup__button");
    this.gamePopUpBtn.addEventListener('click',()=>{
      this.onClick && this.onClick();
      this.hide();
    })
  }
  setClickListner(onClick){
    this.onClick=onClick;
  }

  showWithText(text){
    this.gamePopUpTxt.innerText = text;
    this.gamePopUp.classList.remove("popup--hide");
  }

  hide(){
    this.gamePopUp.classList.add("popup--hide");
  }
}