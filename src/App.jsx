import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";

import Button from "./components/Buttons";
import { COLORS, TYPES } from "./constants/tools";

function App() {
  const [lineThickness, setLineThickness] = useState(5);
  const [color, setColor] = useState("#f44336");
  const [toolType, setToolType] = useState("line");

  return (
    <MainStyled>
      <StageStyled width={500} height={500}>
        <Layer></Layer>
      </StageStyled>

      <div className="tools">
        <div>
          {TYPES.map((type) => {
            return (
              <Button
                value={type.en}
                checked={toolType === type.en}
                onClick={(e) => setToolType(e.target.value)}
              >
                {type.ko}
              </Button>
            );
          })}
        </div>

        <div>
          선 두께 :
          <input
            type="range"
            value={lineThickness}
            min={5}
            max={50}
            onChange={(e) => setLineThickness(e.target.value)}
          />
          {lineThickness}px
        </div>
        <div>
          <CirclePicker
            color={color}
            colors={COLORS}
            onChangeComplete={setColor}
          />
        </div>
      </div>
    </MainStyled>
  );
}

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
