// let dynamicURL = () => {
// 	let number = Math.round(Math.random() * (112 - 1 + 1) + 1);
// 	let url = `./images/a${number}.jpg`
// 	let img = document.getElementById("dynamic");
// 	img.src = url;
// 	img.style.display = "block";
// 	console.log(img);
// }


let dynamicURL = () => {
	let number = Math.round(Math.random() * (112 - 1 + 1) + 1);
	let url = `./images/a${number}.jpg`
	document.body.style = `background-image:url(${url}`
	let card = document.getElementById('main');
	console.log(card);
	let footer = document.getElementById('footer');
	footer.style.display = "block";
	card.style.display = "none";
}