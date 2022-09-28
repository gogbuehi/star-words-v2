import React from 'react';
import './App.css';
import {TrickyWords} from "./app-main/TrickyWords";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Words</h1>
      </header>
      <div>
        <TrickyWords />
      </div>
    </div>
  );
}

export default App;
