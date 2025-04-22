import './App.css';
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import {useState,useEffect} from 'react'

const socket=io("http://localhost:3000");
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Clink App</h1>
      </header>
    </div>
  );
}

export default App;
