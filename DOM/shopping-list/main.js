const counter = document.querySelector(".top__counter");
const inputBox = document.querySelector(".bottom__input");
const inputBtn = document.querySelector(".bottom__add");
const listItems = document.querySelector(".list__items");
const emptyMesaage = document.querySelector(".list__empty");

addEventListener("keypress",()=>inputBox.focus());

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
	counter.innerText = listItems.childElementCount;
});
function createRow(inputText) {
	emptyMesaage.style.opacity = 0;
	const li = document.createElement("li");
	const div = document.createElement("div");
	const button = document.createElement("button");

	li.setAttribute("class", "item__row");
	div.setAttribute("class", "item__content");
	div.innerText = inputText;
	button.setAttribute("class", "item__delete");
	button.innerText = "﹣";
	button.addEventListener("click", deleteItem);

	li.appendChild(div);
	li.appendChild(button);

	return li;
}

async function deleteItem(event) {
	const parent = event.target.parentElement;
	let nextNode=parent.nextSibling;

	if(!nextNode && parent.previousSibling=='text'){
		parent.previousSibling.scrollIntoView({block:'end', behavior:'smooth'});
	}

	await animateOpacity(parent, 1, 0,100);
	parent.remove();

	const childCnt=listItems.childElementCount;
	counter.innerText = childCnt;
	if (counter.innerText == 0) {
		emptyMesaage.style.opacity = 1;
	}
  inputBox.focus();

	if(nextNode){
		const siblings=[];
		siblings.push(nextNode);
		while(nextNode) {
			nextNode=nextNode.nextSibling;
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
