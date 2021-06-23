const jsdom = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "UTF-8");
const { JSDOM } = jsdom;
const { document } = new JSDOM(index).window;
global.document = document;
const {
	flipCard,
	checkMatch,
	startTime,
	threebyGrid,
	twobyGRid,
} = require("../src/app");

const cards = document.querySelectorAll(".card");
const images = document.querySelectorAll("img");
const movesdisplay = document.getElementById("moves");
let twobytwo = document.querySelector("#twobytwo");
let threebytwo = document.querySelector("#threebytwo");
let event;

describe("basic html  testing", function () {
	it("should have images", function () {
		expect(images).not.toBe(null);
	});

	it("the amount of card board must be an even number ", function () {
		expect(cards.length % 2).toEqual(0);
	});
});

describe("Dom manipulation test ", function () {
	beforeAll(() => {
		event = document.createEvent("CustomEvent");
		event.initEvent("click", true, true);
		cards[0].addEventListener("click", flipCard);
		spyOn(cards[0].classList, "add");

		cards[0].dispatchEvent(event);
	});

	it("when it is clicked the class add must be called", function () {
		expect(cards[0].classList.add).toHaveBeenCalled;
	});
});

describe("cards functionality", function () {
	beforeAll(() => {
		let event = document.createEvent("MouseEvent");
		event.initEvent("click", true, true);
		cards[0].addEventListener("click", flipCard);
		cards[1].addEventListener("click", flipCard);

		spyOn(cards[0].classList, "remove");

		cards[0].dispatchEvent(event);
		cards[1].dispatchEvent(event);
	});

	it("Checkmatch function to false  when the cards do not match ", () => {
		[cards[0].dataset.name, cards[1].dataset.name] = ["berry", "mango"];

		checkMatch();

		expect(checkMatch()).toBe(false);
	});

	fit("Checkmatch function to true  when the cards do not match ", () => {
		[cards[0].dataset.name, cards[1].dataset.name] = ["mango", "mango"];

		checkMatch();

		expect(checkMatch()).toBe(true);
	});
});

describe(" twobytwo Grid  functionality", () => {
	beforeEach(() => {
		twobytwo.addEventListener("click", twobyGRid);
		event = document.createEvent("CustomEvent");
		event.initEvent("click", true, true);
		twobytwo.dispatchEvent(event);
	});

	it("should hide the avo cards", () => {
		expect(cards[0].style.display).toBe("none");
		expect(cards[2].style.display).toBe("none");
	});

	it("should hide mango cards ", () => {
		expect(cards[3].style.display).toBe("none");
		expect(cards[5].style.display).toBe("none");
	});

	it("should hide berry cards ", () => {
		expect(cards[1].style.display).toBe("none");
		expect(cards[8].style.display).toBe("none");
	});

	it("should hide orange cards ", () => {
		expect(cards[10].style.display).toBe("none");
		expect(cards[11].style.display).toBe("none");
	});
});

describe(" threeBytwo Grid  functionality", () => {
	beforeEach(() => {
		threebytwo.addEventListener("click", threebyGrid);
		event = document.createEvent("CustomEvent");
		event.initEvent("click", true, true);
		threebytwo.dispatchEvent(event);
	});

	it("should hide the avo cards", () => {
		expect(cards[0].style.display).toBe("none");
		expect(cards[2].style.display).toBe("none");
	});

	it("should hide mango cards ", () => {
		expect(cards[3].style.display).toBe("none");
		expect(cards[5].style.display).toBe("none");
	});

	it("should hide orange cards ", () => {
		expect(cards[10].style.display).toBe("none");
		expect(cards[11].style.display).toBe("none");
	});
});

describe("moves count functionality", () => {
	beforeEach(() => {
		threebytwo.addEventListener("click", threebyGrid);
		event = document.createEvent("CustomEvent");
		event.initEvent("click", true, true);
		threebytwo.dispatchEvent(event);
	});

	it("should add a count flip", () => {
		const movesdisplay = document.getElementById("moves");

		flipCard();

		expect(movesdisplay.textContent).not.toEqual("0");
	});
});

describe("Timer function,", () => {
	let event = document.createEvent("MouseEvent");
	event.initEvent("click", true, true);
	cards[0].addEventListener("click", startTime);

	cards[0].dispatchEvent(event);

	it("should start the timer", () => {
		let timer = document.getElementById("timer");
		expect(timer.innerHTML).not.toEqual("00");
	});
});
