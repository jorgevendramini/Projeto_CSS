//create a random hex number from a list of numbers and letters
const getRandomHexNumber = () => {

	const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

	let hexNumber = [];

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * (numbers.length + letters.length));
		const hexDigit = randomIndex < numbers.length ? numbers[randomIndex] : letters[randomIndex - numbers.length];
		hexNumber.push(hexDigit);
	}

	return '#' + hexNumber.join('');
}

//converts hex number into rgb

const hexToRgb = (hex) => {
	//remove # if present
	hex = hex.replace('#', '');

	// Convert HEX code to RGB
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);

	return `rgb(${r},${g},${b})`;
}

//converts rgb into hsl

const hexToHsl = (hex) => {
	//convert HEX to RGB
	const rgb = hexToRgb(hex);

	let r = rgb.substring(4, rgb.indexOf(','));
	let g = rgb.substring(rgb.indexOf(',') + 2, rgb.lastIndexOf(','));
	let b = rgb.substring(rgb.lastIndexOf(',') + 2, rgb.length - 1);
	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b);
	min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; //achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return 'hsl(' + Math.round(h * 360) + ', ' + Math.round(s * 100) + '%, ' + Math.round(1 * 100) + '%)';
}

//change the color of a div using a random hex number
const changeColor = (targetSquare) => {
	const element = document.querySelector(`.${targetSquare}`);
	const hexColor = getRandomHexNumber();
	if (element) {
		element.style.backgroundColor = hexColor;
	}

	//target the p element for hex next to the corresponding div
	const hexText = element.parentElement.querySelector('.hex');
	if (hexText && hexText.tagName.toLowerCase() == 'p') {
		hexText.innerHTML = hexColor;
		hexText.style.fontSize = "0.9em";
	}

	//target the p element for rgb next to the corresponding div
	const rgbText = element.parentElement.querySelector('.rgb');
	if (rgbText && rgbText.tagName.toLowerCase() == 'p') {
		rgbText.innerHTML = hexToRgb(hexColor);
		rgbText.style.fontSize = "0.9em";
	}

	//target the p element for hsl next to the corresponding div
	const hslText = element.parentElement.querySelector('.hsl');
	if (hslText && hslText.tagName.toLowerCase() == 'p') {
		hslText.innerHTML = hexToHsl(hexColor);
		hslText.style.fontSize = "0.9em";
	}
}


//variable to control number of squares
let squareCount = 1;

//Create a new square
const addSquare = () => {
	squareCount++;

	const header = document.querySelector('.header');
	const container = document.createElement('div');
	container.className = 'container';
	const squareDiv = document.createElement('div');
	const currentSquareNumber = squareCount;
	squareDiv.className = `square square-${currentSquareNumber}`;
	squareDiv.innerText = currentSquareNumber;
	container.appendChild(squareDiv);


	const divContainer1 = document.createElement('div');
	divContainer1.className = 'container-1';

	//create p elements inside divContainer1
	const hexText = document.createElement('p');
	hexText.innerText = 'HEX';
	hexText.className = 'square-1 hex';
	divContainer1.appendChild(hexText);

	const rgbText = document.createElement('p');
	rgbText.innerText = 'RGB';
	rgbText.className = 'square-1 rgb';
	divContainer1.appendChild(rgbText);

	const hslText = document.createElement('p');
	hslText.innerText = 'HSL';
	hslText.className = 'square-1 hsl';
	divContainer1.appendChild(hslText);

	//create buttons

	const divContainer2 = document.createElement('div');
	divContainer2.className = 'container-1';

	const randomizeButton = document.createElement('button');
	randomizeButton.innerText = 'Randomize me!';
	randomizeButton.onclick = function () {
		changeColor(`square-${currentSquareNumber}`);
	}
	divContainer2.appendChild(randomizeButton);

	const testButton = document.createElement('button');
	testButton.innerText = 'test1';
	divContainer2.appendChild(testButton);

	header.appendChild(container);
	container.appendChild(divContainer1);
	container.appendChild(divContainer2);
}


//Delete last square
const removeSquare = () => {
	const header = document.querySelector('.header');
	const containers = document.querySelectorAll('.container');

	if (containers.length > 1) {
		const lastContainer = containers[containers.length - 1];
		header.removeChild(lastContainer);
		squareCount--;
	}
}