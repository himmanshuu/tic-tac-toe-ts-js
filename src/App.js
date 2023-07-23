import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid";
import styled from "styled-components";
// Need a grid component to handle the ui.
// player
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100px;
`;
const H2 = styled.h2``;
const Button = styled.button`
  margin: auto;
  background-color: #61dafb;
  width: 20%;
  height: 50px;
`;

const intializeGrid = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
      arr[i][j] = "X";
    }
  }
  // console.log(arr);
  return arr;
};
function App() {
  const [size, setSize] = useState(3);
  const [totalPlayers, setTotalPlayers] = useState(2);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [victor, setVictor] = useState(null);

  const handleSizeChange = (e) => setSize(e.target.value);
  const handleTotalPlayersChange = (e) => setTotalPlayers(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();

    setGameInProgress(true);

    // creating two-dimensional array
    setGrid(intializeGrid(size));
    setVictor(null);
    setCurrentPlayer(0);
  };
  const handleRestart = () => {
    setGrid(intializeGrid(size));
    setCurrentPlayer(0);
    setVictor(null);
    setGameInProgress(false);
  };
  const handleCellClickHandler = (row, col) => {
    if (grid[row][col] !== "X" || victor || !gameInProgress) return;

    // updating the grid on player's move
    const updatedGridOnPlayerMove = [...grid];
    updatedGridOnPlayerMove[row][col] = currentPlayer;
    setGrid(updatedGridOnPlayerMove);

    // next player
    const getNextPlayer = (currentPlayer) => {
      return (currentPlayer + 1) % totalPlayers;
    };

    // checking for a victor
    const checkVictor = (grid, row, col) => {
      const player = grid[row][col];
      let victor = true;

      // check row conditionds
      for (let j = 0; j < size; j++) {
        if (grid[row][j] !== player) {
          victor = false;
          break;
        }
      }

      if (victor) return true;

      // check column
      victor = true;
      for (let i = 0; i < size; i++) {
        if (grid[i][col] !== player) {
          victor = false;
          break;
        }
      }

      if (victor) return true;

      // check diagonal'

      if (row === col) {
        victor = true;
        for (let i = 0; i < size; i++) {
          if (grid[i][i] !== player) {
            victor = false;
            break;
          }
        }
      }
      if (victor) return true;

      // check opposite diagonal

      if (row + col === size - 1) {
        victor = true;
        for (let i = 0; i < size; i++) {
          if (grid[i][size - 1 - i] !== player) {
            victor = false;
            break;
          }
        }
      }
      if (victor) return true;
      return false;
    };

    // checking for a draw
    const checkDraw = (grid) => {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (grid[i][j] === "X") {
            return false;
          }
        }
      }
      return true;
    };

    // gets a victor or draw
    if (checkVictor(updatedGridOnPlayerMove, row, col)) {
      setVictor(currentPlayer);
    } else if (checkDraw(updatedGridOnPlayerMove)) {
      setVictor("Draw");
    } else {
      // move to next player's turn;

      setCurrentPlayer((currentPlayer) => getNextPlayer(currentPlayer));
    }
  };
  console.log(victor);
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {victor !== null ? (
        <div>
          <h2>
            {victor === "Draw" ? "Drawww!!! Start Next Game" : `${victor} wins`}
            <Button onClick={handleRestart}>Play Again</Button>
          </h2>
        </div>
      ) : gameInProgress ? (
        <>
          <H2>Current Player : {currentPlayer}</H2>
          <Grid
            grid={grid}
            size={size}
            handleCellClickHandler={handleCellClickHandler}
          />
        </>
      ) : (
        <FormWrapper onSubmit={submitHandler}>
          <Label>
            Size:
            <StyledInput
              type="text"
              value={size}
              onChange={handleSizeChange}
            ></StyledInput>
          </Label>
          <Label>
            Players:
            <StyledInput
              type="text"
              value={totalPlayers}
              onChange={handleTotalPlayersChange}
            ></StyledInput>
          </Label>
          <Button type="submit" value="Submit">
            Start Game
          </Button>
        </FormWrapper>
      )}
    </div>
  );
}

export default App;
