const counter = document.querySelector(".top__counter");
const inputBox = document.querySelector(".bottom__input");
const inputBtn = document.querySelector(".bottom__add");
const listItems = document.querySelector(".list__items");
const emptyMesaage = document.querySelector(".list__empty");

addEventListener("keypress",()=>inputBox.focus());

inputBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const inputText = inputBox.value;
	if (!inputText) {
		inputBox.focus();
		return;
	}
	const row = createRow(inputText);

	listItems.appendChild(row);
	animateOpacity(row, 0, 1);

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
	const parent = event.target.parentNode;
	await animateOpacity(parent, 1, 0);
	parent.remove();

	counter.innerText = listItems.childElementCount;
	if (counter.innerText == 0) {
		emptyMesaage.style.opacity = 1;
	}
  inputBox.focus();
}
function animateOpacity(element, from, to) {
	const animateOpacityKeyframes = new KeyframeEffect(
		element,
		[{ opacity: from }, { opacity: to }],
		{ duration: 300 }
	);
	const animateOpacity = new Animation(
		animateOpacityKeyframes,
		document.timeline
	);

	animateOpacity.play();
	return animateOpacity.finished;
}
