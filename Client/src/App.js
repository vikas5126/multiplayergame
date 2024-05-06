import React, { useEffect } from "react";
import styles from "./App.module.css"
import Square from "./Square/Square";
import { io } from "socket.io-client";
import { useState } from "react";
import InputForm from "./InputForm/InputForm";

const renderSquare = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

export default function App(){
  const [gameState, setGameState] = useState(renderSquare);
  const [playOnline, setPlayOnline] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [opponentName, setOpponentName] = useState("");
  const [socket, setSocket] = useState(null);
  const [finishedState, setFinishedState] = useState(false)
  const [finishedStateArray, setFinishedStateArray] = useState([])
  const [playingAs, setPlayingAs] = useState(null);

  function checkWinner () {
    for(let i=0; i<gameState.length; i++){
      if(gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2]){
        setFinishedStateArray([i*3 + 0, i*3+1, i*3+2]);
        return gameState[i][0];
      }
    }

    for(let i=0; i<gameState.length; i++){
      if(gameState[0][i] === gameState[1][i] && gameState[1][i] === gameState[2][i]){
        setFinishedState([0*3+i, 1*3+ i, 2*3+i]);
        return gameState[0][i];
      }
    }

    if(gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]){
      return gameState[0][0];
    }

    if(gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]){
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if(e === "circle" || e === "cross") {
        return true
      }
    })

    if (isDrawMatch) return "draw";

    return null;
  }

  useEffect(()=> {
    const winner = checkWinner();
    if(winner){
      setFinishedState(winner);
    }
  }, [gameState]);

  const handlePlayOnline = async () =>{
    const newSocket = io("http://localhost:3000", {
      autoConnect: true,
    });
    setSocket(newSocket);
  }

  socket?.on("connect", ()=>{
    setPlayOnline(true);
    console.log(socket.id);
  })

  socket?.on("opponentFound", function (data){
    setPlayingAs(data.playingAs);
    setOpponentName(data.opponentName);
  })

  socket?.on("opponentLeftMatch", ()=>{
    setFinishedState("opponentLeftMatch");
  })

  socket?.on("playerMoveFromServer", (data)=>{
    const id = data.state.id;
    setGameState((prevState)=> {
      let newState = [...prevState];
      const rowIndex = Math.floor(id/3);
      const colIndex = id % 3;
      newState[rowIndex][colIndex] = data.state.sign;
      return newState;
    });
    setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
  })

  if(!playOnline){
    return (
      <div className={styles.Offline} onClick={handlePlayOnline}>
        <h1>Play Online</h1>
      </div>
    )
  }
  else if(playOnline && playerName === ""){
    return (
      <InputForm setPlayerName={setPlayerName} setPlayOnline={setPlayOnline} socket={socket}/>
    )
  }
  else if(playOnline && playerName !== "" && opponentName === ""){
    return (
      <div className={`${styles.Offline} ${styles.Waiting}`}>
        <h1>Waiting For Opponent</h1>
      </div>
    )
  }
  else{
    return (
      <>
        <div className={styles.players}>
          <div className={`${styles.left} ${currentPlayer === playingAs ? styles.currentMoveCircle : ""}`}>{playerName} </div>
          <div className={`${styles.right} ${currentPlayer !== playingAs ? styles.currentMoveCross : ""}`}>{opponentName}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1>Tic Tac Toe</h1>
          </div>
          <div className={styles.board}>
            {renderSquare.map((row, rowIndex)=>
              row.map((e, colIndex)=>
                <Square 
                  socket={socket}
                  playingAs={playingAs}
                  gameState={gameState}
                  finishedState={finishedState}
                  finishedStateArray={finishedStateArray}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                  setGameState={setGameState}
                  id={rowIndex*3 + colIndex}
                  key={rowIndex*3 + colIndex}
                  currentElement={e}
                />
              )
            )}
          </div>

          {finishedState && finishedState !== "opponentLeftMatch" && finishedState !== "draw" && (
            <h3 className={styles.finished}>
              {finishedState === playingAs ? "You " : finishedState} won the game
            </h3>
          )}
          {finishedState &&
          finishedState !== "opponentLeftMatch" &&
          finishedState === "draw" && (
            <h3 className="finished-state">It's a Draw</h3>
          )}
        </div>
      </>
    )
  }
}