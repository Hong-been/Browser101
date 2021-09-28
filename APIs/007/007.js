const coord = document.querySelector(".coordinates");
const target = document.querySelector(".target");
const lineHorizontal = document.querySelector(".line.horizontal");
const lineVertical = document.querySelector(".line.vertical");

addEventListener('load',()=>{
	const targetRect=target.getBoundingClientRect();
	const targetHalfWidth=targetRect.width/2;
	const targetHalfHeight=targetRect.height/2;
	
	document.addEventListener("mousemove", showCoor);
	document.addEventListener("mouseenter", showCoor);
	function showCoor(event) {
		const x = event.pageX;
		const y = event.pageY;
	
		coord.innerText = `${x}px, ${y}px`;
		coord.style.transform = `translate(${x}px,${y}px)`;
		target.style.transform = `translate(${x-targetHalfWidth}px,${y-targetHalfHeight}px)`;
		lineHorizontal.style.transform = `translateY(${y}px)`;
		lineVertical.style.transform = `translateX(${x}px)`;
	}
	
})