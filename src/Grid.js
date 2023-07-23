import React from "react";
import styled from "styled-components";

const getMaxWidth = (size) => `${size * 122}px`;
const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) =>
    props.size ? `${getMaxWidth(props.size)}` : "310px"};
`;
const GridRowWrapper = styled.div``;
const Cell = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
`;
export default function Grid({ grid, size, handleCellClickHandler }) {
  return (
    <GridWrapper size={size}>
      {grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClickHandler(rowIndex, colIndex)}
          >
            {grid[rowIndex][colIndex] !== "X" && grid[rowIndex][colIndex]}
          </Cell>
        ));
      })}
    </GridWrapper>
  );
}
