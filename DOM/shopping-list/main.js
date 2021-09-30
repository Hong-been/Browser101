const counter=document.querySelector(".title__counter");
const inputBox=document.querySelector(".bottom__input");
const inputBtn=document.querySelector(".bottom__add-btn");
const listItems=document.querySelector(".list__items");
const emptyMesaage=document.querySelector(".block__empty");

inputBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  const inputText=inputBox.value;
  if(inputText){
    emptyMesaage.style.opacity=0;
    const li=document.createElement("li");
    const div=document.createElement("div");
    const button=document.createElement("button");

    li.setAttribute('class','item');
    div.setAttribute('class','item__content');
    div.innerText=inputText;
    button.setAttribute('class','item__delete-btn');
    button.innerText='﹣';
    button.addEventListener("click",deleteItem);

    li.appendChild(div);
    li.appendChild(button);
    listItems.appendChild(li);

    const showSmoothKeyframes=new KeyframeEffect(li,
      [
        { opacity:0 }, 
        { opacity:1 }
    ], { duration:80 });
    const showSmooth=new Animation(showSmoothKeyframes, document.timeline);
    
    showSmooth.play();
    setTimeout(()=>{
      counter.innerText=listItems.childElementCount; },250);

    inputBox.value='';
    counter.innerText=listItems.childElementCount;
  }
})

function deleteItem(event){
  const parent=event.target.parentNode;
  const showSmoothKeyframes=new KeyframeEffect(parent,
    [
      { opacity:1 }, 
      { opacity:0 }
  ], { duration: 300, endDelay:100 });
  const moveSmooth=new Animation(showSmoothKeyframes, document.timeline);
  
  moveSmooth.play();
  setTimeout(()=>{
    parent.remove();
    counter.innerText=listItems.childElementCount;
    if(counter.innerText==0){
      emptyMesaage.style.opacity=1;
    } },200);
  
  
}
