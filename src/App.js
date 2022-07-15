import {useState, useEffect} from 'react'
var allAlphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// const SECONDS = 60

function App() {
  const [alphabets, setAlphabets] = useState([])



  useEffect(() => {
    setAlphabets(generateAlphabets())
  }, [])

  function generateAlphabets() {
    var randomAlphabets = []
    for (var i = 0; i < 20; i++) {
      randomAlphabets.push(allAlphabets[Math.floor(Math.random()*alphabets.length)]);
    }

    return randomAlphabets;
  }




  return (
    <div className="App">
      <div className="section">
        <div className="card"> 
          <div className="card-content">
            <div className="content">
            {alphabets.map((alphabet, i) => (
                  <span key={i}>
                    <span>
                      {alphabet}
                      {/* {alphabet.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) } */}
                    </span>
                    <span> </span>
                  </span>
                ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
