const coord = document.querySelector(".coordinates");
const target = document.querySelector(".target");
const lineHorizontal = document.querySelector(".line.horizontal");
const lineVertical = document.querySelector(".line.vertical");

document.addEventListener("mousemove", showCoor);
document.addEventListener("mouseenter", showCoor);
function showCoor(event) {
	const x = event.pageX;
	const y = event.pageY;

	coord.innerText = `${x}px, ${y}px`;
	coord.style.top = `${y}px`;
	coord.style.left = `${x}px`;
	target.style.top = `${y}px`;
	target.style.left = `${x}px`;
	lineHorizontal.style.top = `${y}px`;
	lineVertical.style.left = `${x}px`;
}
