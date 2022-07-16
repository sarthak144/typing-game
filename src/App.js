import { useEffect, useState } from "react";
import Confetti from "react-confetti";

var allAlphabets = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const SECONDS = 0;

function App() {
	const [alphabets, setAlphabets] = useState([]);
	const [timer, setTimer] = useState(SECONDS);
	const [index, setIndex] = useState(-1);
	const [currAlphabet, setCurrAlphabet] = useState();
	const [currkey, setcurrkey] = useState(null);
	const [win, setWin] = useState(false);
	// const [subText, setSubText] = useState("Click Start");
	const [interval, setInter] = useState(null);
	const [highScore, setHighScore] = useState(false);

	const storeHighScore = (time) => {
		const score = localStorage.getItem("highscore");
		if (score === null || score > time) {
			setHighScore(true);
			setTimeout(() => {
				setHighScore(false);
			}, 10000);
			localStorage.setItem("highscore", time);
		}
	};

	const tempfun = (e) => {
		if (e.key === "Enter" && index === -1) {
			setIndex(0);
			start();
		} else if (index > -1) {
			setcurrkey(e.key);
		}
	};

	useEffect(() => {
		console.log(index);
		setCurrAlphabet(alphabets[index]);
		if (index >= 19) {
			setWin(true);
			// setSubText("You Won!");
			storeHighScore(timer);
			setIndex(-1);
			clearInterval(interval);
		}
		document.addEventListener("keyup", tempfun);

		return () => document.removeEventListener("keyup", tempfun);
	}, [index]);

	useEffect(() => {
		if (currkey != null) {
			if (currkey?.toUpperCase() === currAlphabet) {
				setIndex(index + 1);
				// setSubText("Correct!");
			} else {
				setTimer((prevTimer) => {
					return prevTimer + 0.5;
				});
				// setSubText("Try Again!");
			}
		}
	}, [currkey]);

	function generateAlphabets() {
		var randomAlphabets = [];
		for (var i = 0; i < 20; i++) {
			let randomalph =
				allAlphabets[Math.floor(Math.random() * allAlphabets.length)];
			if (i > 0) {
				let prevalpha = randomAlphabets[i - 1];

				while (randomalph === prevalpha) {
					randomalph =
						allAlphabets[Math.floor(Math.random() * allAlphabets.length)];
				}
			}
			randomAlphabets.push(randomalph);
		}
		setCurrAlphabet(randomAlphabets[0]);
		// setSubText("Enter Alphabet Shown");
		return randomAlphabets;
	}

	function start() {
		const randomString = generateAlphabets();
		console.log(randomString.toString());
		setAlphabets(randomString);
		setTimer(0);

		setInter(
			setInterval(() => {
				// console.log('index =', index)

				setTimer((prevTimer) => prevTimer + 1);
			}, 1000)
		);
	}

	return (
		<div className="App font-poppins bg-[#0e184f] text-center flex justify-center">
			<div className=" h-screen text-white p-40 text-center w-2/3">
				<h1 className="text-2xl font-bold my-10"> Type The Alphabet</h1>
				<p>Typing Game to see how fast you type. Timer starts when you do ;)</p>
				<div className="bg-white p-10 rounded-2xl font-extrabold text-green-700 text-6xl my-10">
					{index == -1
						? !win
							? "Enter to Start"
							: "Enter to Restart"
						: currAlphabet}
					{highScore && <Confetti />}
				</div>
				<p>Time: {timer}</p>
				<br />
				{localStorage.getItem("highscore") && (
					<p className=" font-extralight text-sm">
						{" "}
						My best time: {localStorage.getItem("highscore")}{" "}
					</p>
				)}
			</div>
		</div>
	);
}

export default App;
