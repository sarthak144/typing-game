import {useState, useEffect} from 'react'
var allAlphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const SECONDS = 0

function App() {
  const [alphabets, setAlphabets] = useState([])
  const [timer, setTimer] = useState(SECONDS)
  const [index, setIndex] = useState(0)
  const [currAlphabet, setCurrAlphabet] = useState()
  const [currInput, setCurrInput] = useState("")
  const [win, setWin] = useState(false)
  const [finalTime, setFinalTime] = useState(0)
  const [subText, setSubText] = useState("Click Start")



  // useEffect(() => {
  //   setAlphabets(generateAlphabets())
  // }, [])

  function generateAlphabets() {
    var randomAlphabets = []
    for (var i = 0; i < 20; i++) {
      randomAlphabets.push(allAlphabets[Math.floor(Math.random()*allAlphabets.length)]);
      if (i===0) {
        setCurrAlphabet(randomAlphabets[0])
        setSubText("Enter Alphabet Shown")
      }
    }

    return randomAlphabets;
  }

  function start()
  { 
    setAlphabets(generateAlphabets())
    
    let interval= setInterval(() => {
      setTimer((prevTimer) => {
        return prevTimer+1

      
    })
    }
    , 1000)
  }

  function handleKeyDown(event)
  {
    console.log(event.key)
    if (event.key.toUpperCase()===alphabets[index])
    {
      setIndex(index+1)
      setCurrAlphabet(alphabets[index+1])
      setSubText("Correct!")
      console.log(index)
      if (index===19)
      {
        setWin(true)
        setSubText("You Won!")
        setFinalTime(timer)
      }
    }
    else
    {
      setTimer((prevTimer) => {
      
        return prevTimer+0.5
      })
      setSubText("Try Again!")
    }
    
  }



  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{win?
          (
            
            <>
              {finalTime}
              <br/>
              {subText}
              </>

            ):
          
            (
              <>
              {timer}
              <br/>
              {subText}
              </>
              
              
              
          
          )}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input  type="text" className="input"   onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}/>
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start} >
          Start
        </button>
      </div>
      <div className="section">
        <div className="card"> 
          <div className="card-content">
            <div className="content"> 
              {/* {JSON.stringify(alphabets)} */}
              {finalTime}<br/><br/>
              {currAlphabet}<br/><br/>
            {alphabets.map((alphabet, i) => (
                  <>
                    <span>
                      {alphabet}
                      {/* {alphabet.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) } */}
                    </span>
                    <span> </span>
                  </>
                ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
