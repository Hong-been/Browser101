const counter = document.querySelector(".top__counter");
const inputBox = document.querySelector(".bottom__input");
const inputBtn = document.querySelector(".bottom__add");
const listItems = document.querySelector(".list__items");
const emptyMesaage = document.querySelector(".list__empty");
let id=0; //실제 배포 프로젝트에는 UUID 같은 라이브러리를 사용하자.

addEventListener("keypress",()=>inputBox.focus());

listItems.addEventListener('click',event=>{
	const { target:{dataset:{targetId}}}=event;
	if(targetId) {
		const toBeDeleted=document.querySelector(`.item__row[data-id="${targetId-100}"]`);
		deleteItem(toBeDeleted);
	}
});

inputBtn.addEventListener("click", async (event) => {
	event.preventDefault();
	const inputText = inputBox.value;
	if (!inputText) {
		inputBox.focus();
		return;
	}
	const row = createRow(inputText);
	listItems.appendChild(row);

	row.scrollIntoView({block:'end', behavior:'smooth'});
	await animateOpacity(row, 0, 1,100);

	inputBox.value = "";
	inputBox.focus();
	updateCounter(listItems.childElementCount);
});
function createRow(inputText) {
	emptyMesaage.style.opacity = 0;
	
	const li = document.createElement("li");
	li.setAttribute("class", "item__row");
	li.setAttribute("data-id", id);

	li.innerHTML=`	<div class="item__content">${inputText}</div>
												<button class="item__delete" data-target-id=${id+100}>﹣</button>`;
	id++;
	return li;
}
function updateCounter(cnt){
	counter.innerText=cnt;
	if(cnt===0)	emptyMesaage.style.opacity = 1;
}
async function deleteItem(target) {
	let nextNode=target.nextSibling;

	if(!nextNode && target.previousSibling=='text'){
		target.previousSibling.scrollIntoView({block:'end', behavior:'smooth'});
	}

	await animateOpacity(target, 1, 0,100);
	target.remove();
	updateCounter(listItems.childElementCount);
  inputBox.focus();

	if(nextNode){
		const siblings=[];
		siblings.push(nextNode);
		while(true) {
			nextNode=nextNode.nextSibling;
			if(nextNode === null) break;
			siblings.push(nextNode);
		}
		await animateMoveUp(siblings,100);
	}
}

function animateMoveUp(elements,duration) {
	const height=elements[0].offsetHeight;
	
	elements.map(element => {
		const animateMoveUpKeyframes = new KeyframeEffect(
			element,
			[{ transform:`translateY(${height}px)` }, { transform: `translateY(0px)`}],
			{ duration },
			{easing:'ease-in'},
			{endDelay:100}
		);
		const animateMoveUp = new Animation(
			animateMoveUpKeyframes,
			document.timeline
		);
	
		animateMoveUp.play();
		return animateMoveUp.finished;
	})
	
}
function animateOpacity(element, from, to, duration) {
	const animateOpacityKeyframes = new KeyframeEffect(
		element,
		[{ opacity: from }, { opacity: to }],
		{ duration },
		{easing:'ease'},
		{endDelay:100}
	);
	const animateOpacity = new Animation(
		animateOpacityKeyframes,
		document.timeline
	);

	animateOpacity.play();
	return animateOpacity.finished;
}
