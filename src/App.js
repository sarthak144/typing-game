import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Right from "./assets/right.wav";
import Wrong  from "./assets/wrong.wav";
import Start from "./assets/start.wav";
import Highscore  from "./assets/highscore.wav";
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
	const [endGameText, setEndGameText] = useState("Enter to Restart")

	
	let right = new Audio(Right)
	let wrong = new Audio(Wrong)
	let startSound = new Audio(Start)
	let highscoreSound = new Audio(Highscore)
	const storeHighScore = (time) => {
		const score = localStorage.getItem("highscore");
		if (score === null || score > time) {
			setHighScore(true);
			highscoreSound.play()
			setTimeout(() => {
				setEndGameText("Enter to Restart")
				setHighScore(false);
			}, 5000);
			setEndGameText("New Highscore")
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
		document.addEventListener("keyup touchend", tempfun);

		return () => document.removeEventListener("keyup touchend", tempfun);
	}, [index]);

	useEffect(() => {
		if (currkey != null) {
			if (currkey?.toUpperCase() === currAlphabet) {
				setIndex(index + 1);
				right.play()
				// setSubText("Correct!");
			} else {
				wrong.play()
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
		startSound.play();
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

	function reset()
	{
		clearInterval(interval);
		setTimer(0);
		setIndex(-1);
		setWin(false);
		
		
	}

	return (
		<div className="App  font-poppins bg-[#0e184f] text-center flex justify-center">
			<div className=" h-screen text-white lg:p-40 p-10 text-center lg:w-2/3">
				<h1 className="text-2xl font-bold my-10"> Type The Alphabet</h1>
				<p>Typing Game to see how fast you type. Timer starts when you do :)</p>
				<div className="bg-white p-10 rounded-2xl font-extrabold text-green-700 text-6xl my-10">
					{index === -1
						? !win
							? "Enter to Start"
							: endGameText
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

				<div className=" w-full mt-20  flex flex-row md:hidden" >
					<input className=" bg-[#f7f2e8] w-full "/>
					<button onClick={reset} className="bg-[#dd4f6d] py-2 px-5">Reset</button>
				</div>
			</div>
			
		</div>
	);
}

export default App;
