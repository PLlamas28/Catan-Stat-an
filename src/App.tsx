// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CardsManager from './CardsManager.tsx'
import RollTracker from './RollTracker.tsx'
import NavBar from './NavBar.tsx'
import { useState } from 'react';

function App() {
  
  const [latestRollArg, setLatestRollarg] = useState(0);
  const [triggerRoll, setTriggerRoll] = useState(true);

  return (
    <>
      
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div className='App' id='appy'>

        <NavBar/>

        <main>
          <RollTracker
            setLatestRoll={ setLatestRollarg }
            setTriggerRoll={ setTriggerRoll }
          />
          <CardsManager
            latestRoll={ latestRollArg }
            triggerRoll = { triggerRoll }
          />
        </main>
        

      </div>
    </>
  )
}

export default App;
