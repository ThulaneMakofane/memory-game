let board = document.querySelector("#board");
const cards = document.querySelectorAll(".card");
let twobytwo = document.querySelector("#twobytwo");
let threebytwo = document.querySelector("#threebytwo");
let fourbythree = document.querySelector("#fourbythree");
let restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const timeTaken = document.getElementById("time");
const quitGame = document.getElementById("quitgame");
const movesdisplay = document.getElementById("moves");

const message = document.getElementById("message-overlay");
let moves = 0;
let count = 0;
let cardFlipped = false;
let firstCard, secondCard;
let lockFlip = false;
let clickedTwobytwo = false;
let clickedthreebytwo = false;

let hr = 0;
let min = 0;
let sec = 0;
let timeCycle;

function flipCard() {
	startTime();
	lockDefault();
	if (lockFlip) return;
	if (this === firstCard) return;
	this.classList.add("flip");
	if (!cardFlipped) {
		moves += 2;
		firstCard = this;
		cardFlipped = true;
	} else {
		secondCard = this;
		cardFlipped = false;
		checkMatch();
	}
}

const lockDefault = () => {
	if (
		cardFlipped == true &&
		clickedTwobytwo == false &&
		clickedthreebytwo == false
	) {
		defaultGrid();
	}
};

const checkMatch = (firstFlip, secondFlip) => {
	firstFlip = firstCard.dataset.name;
	secondFlip = firstCard.dataset.name;

	if (firstCard.dataset.name === secondCard.dataset.name) {
		firstCard.removeEventListener("click", flipCard);
		secondCard.removeEventListener("click", flipCard);
		count++;
		gridTypeTime();
		return true;
	} else {
		removeflip();
		return false;
	}
};

const removeflip = () => {
	lockFlip = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		lockFlip = false;
	}, 1500);
};

const restartGame = () => {
	location.reload();
};

const defaultGrid = () => {
	quitGame.style.display = "block";
	threebytwo.style.display = "none";
	twobytwo.style.display = "none";
};

const twobyGRid = () => {
	threebytwo.style.display = "none";
	fourbythree.style.display = "none";
	quitGame.style.display = "block";
	clickedTwobytwo = true;
	hideAvoCard();
	hideMango();
	hideOrange();
	hideBerry();
	board.style.gridTemplateColumns = "repeat(2, 20%)";
};

const threebyGrid = () => {
	twobytwo.style.display = "none";
	fourbythree.style.display = "none";
	quitGame.style.display = "block";
	clickedthreebytwo = true;

	viewAll();
	hideAvoCard();
	hideMango();
	hideOrange();
	board.style.gridTemplateColumns = "repeat(3, 20%)";
};
const viewAll = () => {
	cards[0].style.display = "flex";
	cards[2].style.display = "flex";
	cards[3].style.display = "flex";
	cards[5].style.display = "flex";
	cards[1].style.display = "flex";
	cards[8].style.display = "flex";
	cards[10].style.display = "flex";
	cards[11].style.display = "flex";
};

const hideAvoCard = () => {
	cards[0].style.display = "none";
	cards[2].style.display = "none";
};

const hideMango = () => {
	cards[3].style.display = "none";
	cards[5].style.display = "none";
};

const hideBerry = () => {
	cards[1].style.display = "none";
	cards[8].style.display = "none";
};
const hideOrange = () => {
	cards[10].style.display = "none";
	cards[11].style.display = "none";
};

const showMessage = () => {
	message.style.display = "block";
	movesdisplay.textContent = `${moves}`;
	displayTime();
};

const showTime = () => {
	let h, m, s;
	h = hr;
	m = min;
	s = sec;
	if (hr < 10) {
		h = "0" + hr;
	}
	if (min < 10) {
		m = "0" + min;
	}
	if (sec < 10) {
		s = "0" + sec;
	}

	timer.textContent = `${h}:${m}:${s}`;
};

const displayTime = () => {
	let time = "";
	if (hr > 0) {
		if (hr > 1) {
			time += `${hr} hours, `;
		} else {
			time += `${hr} hour, `;
		}
	}

	if (min > 0) {
		if (min > 1) {
			time += `${min} minutes and `;
		} else {
			time += `${min} minute and `;
		}
	}

	if (sec > 0) {
		if (sec > 1) {
			time += `${sec} seconds.`;
		} else {
			time += `${sec} second.`;
		}
	}
	timeTaken.textContent = `${time}`;
};

const startCount = () => {
	stoptime = false;
	timeCycle = setInterval(() => {
		sec += 1;
		if (sec == 60) {
			min += 1;
			sec = 0;
		}
		if (min == 60) {
			hr += 1;
			min = 0;
			sec = 0;
		}
		showTime();
	}, 1000);
};

let startTime = (function () {
	var executed = false;
	return function () {
		if (!executed) {
			executed = true;
			startCount();
		}
	};
})();

const stopCount = () => {
	stoptime = true;
	clearInterval(timeCycle);
	showTime();
};

const gridTypeTime = () => {
	if (count == 2 && clickedTwobytwo == true) {
		stopCount();
		showMessage();
	}
	if (count == 3 && clickedthreebytwo == true) {
		stopCount();
		showMessage();
	}
	if (count == 6) {
		stopCount();
		showMessage();
	}
};

(function shuffleCards() {
	cards.forEach((card) => {
		let position = Math.floor(Math.random() * 12);
		card.style.order = position;
	});
})();
fourbythree.addEventListener("click", defaultGrid);
twobytwo.addEventListener("click", twobyGRid);
threebytwo.addEventListener("click", threebyGrid);
quitGame.addEventListener("click", restartGame);
restart.addEventListener("click", restartGame);

cards.forEach((card) => card.addEventListener("click", flipCard));

module.exports = { flipCard, checkMatch, startTime, twobyGRid, threebyGrid };
