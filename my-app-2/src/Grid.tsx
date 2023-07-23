import React from "react";
import styled from "styled-components";
import { Celltype } from "./App";

interface GridProps {
    grid: Array<Array<Celltype>>;
    size: number;
    handleCellClickHandler: (row: number, col: number) => void;
}

interface GridWrapperProps {
    size: number;
}
const getMaxWidth = (size: number) => `${size * 122}px`;
const GridWrapper = styled.div<GridWrapperProps>`
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
export default function Grid(props : GridProps ) {
  return (
    <GridWrapper size={props.size}>
      {props.grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onClick={() => props.handleCellClickHandler(rowIndex, colIndex)}
          >
            {props.grid[rowIndex][colIndex] !== "X" && props.grid[rowIndex][colIndex]}
          </Cell>
        ));
      })}
    </GridWrapper>
  );
}
