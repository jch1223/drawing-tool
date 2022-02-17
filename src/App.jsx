import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { Stage, Layer, Line } from "react-konva";
import styled from "styled-components";
import { css } from "styled-components";

function App() {
  const [lineThickness, setLineThickness] = useState(5);
  const [color, setColor] = useState("#f44336");
  const [type, setType] = useState("line"); // spline, circle, rect, 다각형

  const onLineThicknessChangeHandler = (e) => {
    setLineThickness(e.target.value);
  };

  return (
    <MainStyled>
      <StageStyled width={500} height={500}>
        <Layer></Layer>
      </StageStyled>

      <div className="tools">
        <ButtonStyled checked={type === "line"}>직선</ButtonStyled>
        <ButtonStyled>곡선</ButtonStyled>
        <ButtonStyled>원</ButtonStyled>
        <ButtonStyled>직사각형</ButtonStyled>
        <ButtonStyled>다각형</ButtonStyled>
        <div>
          선 두께 :
          <input
            type="range"
            value={lineThickness}
            min={5}
            max={50}
            onChange={onLineThicknessChangeHandler}
          />
          {lineThickness}px
        </div>
        <div>
          <CirclePicker
            color={color}
            colors={[
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
            ]}
            onChangeComplete={setColor}
          />
        </div>
      </div>
    </MainStyled>
  );
}

const ButtonStyled = styled.button`
  border: 1px solid #2196f3;
  border-radius: 3px;
  background: none;
  font-weight: bold;

  ${({ checked }) => {
    return checked
      ? css`
          background-color: #2196f3;
          color: #ffffff;
        `
      : css`
          color: #2196f3;
        `;
  }}
`;

const StageStyled = styled(Stage)`
  margin: 50px;

  .konvajs-content {
    border-radius: 5px;
    box-shadow: 0px 5px 2px 0px rgb(0 0 0 / 20%),
      2px 4px 4px 3px rgb(0 0 0 / 14%), 2px 3px 7px 2px rgb(0 0 0 / 12%);
  }
`;

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
