import React, { useEffect, useRef, useState } from "react";
import { CirclePicker } from "react-color";
import { Stage, Layer, Line, Circle, Rect, RegularPolygon } from "react-konva";
import styled from "styled-components";

import Button from "./components/Buttons";

import { COLORS, TYPES } from "./constants/tools";

function App() {
  const [lineThickness, setLineThickness] = useState(5);
  const [color, setColor] = useState("#f44336");
  const [toolType, setToolType] = useState("line");
  const [lines, setLines] = useState(
    JSON.parse(localStorage.getItem("lines")) || []
  );

  const isDrawing = useRef(false);
  const isSpline = useRef(false);

  useEffect(() => {
    console.log(lines);
  }, [lines]);

  useEffect(() => {
    localStorage.setItem("lines", JSON.stringify(lines));
  }, [lines]);

  const onMouseDownHandler = (e) => {
    isDrawing.current = true;

    const { x, y } = e.target.getStage().getPointerPosition();

    if (toolType === "line") {
      return setLines([
        ...lines,
        { toolType, color, lineThickness, startPoints: [x, y], endPoints: [] },
      ]);
    }

    if (toolType === "spline") {
      if (!isSpline.current) {
        isSpline.current = true;

        return setLines([
          ...lines,
          {
            toolType,
            color,
            lineThickness,
            startPoints: [x, y],
            middlePoints: [],
            endPoints: [],
          },
        ]);
      }

      isDrawing.current = false;

      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];

      lastLine.middlePoints = [x, y];
      newLines[newLines.length - 1] = lastLine;

      return setLines(newLines);
    }

    if (toolType === "circle" || toolType === "rect") {
      return setLines([
        ...lines,
        {
          toolType,
          color,
          lineThickness,
          startPoints: [x, y],
          endPoints: [x, y],
        },
      ]);
    }

    if (toolType === "regularPolygon") {
      return setLines([
        ...lines,
        {
          toolType,
          color,
          lineThickness,
          startPoints: [x, y],
          endPoints: [x, y],
        },
      ]);
    }
  };

  const onMouseMoveHandler = (e) => {
    if (!isDrawing.current) return;

    const newLines = [...lines];
    const lastLine = newLines[newLines.length - 1];
    const { x, y } = e.target.getStage().getPointerPosition();

    lastLine.endPoints = [x, y];
    newLines[newLines.length - 1] = lastLine;

    setLines(newLines);
  };

  const onMouseUpHandler = (e) => {
    isDrawing.current = false;

    if (toolType === "spline") {
      const lastLine = lines[lines.length - 1];

      if (lastLine.middlePoints.length || !lastLine.endPoints.length) {
        isSpline.current = false;
      }
    }
  };

  return (
    <MainStyled>
      <StageStyled
        width={500}
        height={500}
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={onMouseUpHandler}
      >
        <Layer>
          {lines.map((line, i) => {
            switch (line.toolType) {
              case "line":
                return (
                  <Line
                    key={i}
                    points={[...line.startPoints, ...line.endPoints]}
                    stroke={line.color}
                    strokeWidth={line.lineThickness}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              case "spline":
                return (
                  <Line
                    key={i}
                    points={[
                      ...line.startPoints,
                      ...line.middlePoints,
                      ...line.endPoints,
                    ]}
                    stroke={line.color}
                    strokeWidth={line.lineThickness}
                    lineCap="round"
                    lineJoin="round"
                    tension={0.5}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={i}
                    x={(line.startPoints[0] + line.endPoints[0]) / 2}
                    y={(line.startPoints[1] + line.endPoints[1]) / 2}
                    radius={Math.max(
                      Math.abs(line.startPoints[0] - line.endPoints[0]) / 2,
                      Math.abs(line.startPoints[1] - line.endPoints[1]) / 2
                    )}
                    stroke={line.color}
                    strokeWidth={line.lineThickness}
                  />
                );
              case "rect":
                return (
                  <Rect
                    key={i}
                    x={Math.min(line.startPoints[0], line.endPoints[0])}
                    y={Math.min(line.startPoints[1], line.endPoints[1])}
                    width={Math.abs(line.startPoints[0] - line.endPoints[0])}
                    height={Math.abs(line.startPoints[1] - line.endPoints[1])}
                    stroke={line.color}
                    strokeWidth={line.lineThickness}
                  />
                );

              case "regularPolygon":
                return (
                  <RegularPolygon
                    key={i}
                    x={(line.startPoints[0] + line.endPoints[0]) / 2}
                    y={(line.startPoints[1] + line.endPoints[1]) / 2}
                    radius={Math.max(
                      Math.abs(line.startPoints[0] - line.endPoints[0]) / 2,
                      Math.abs(line.startPoints[1] - line.endPoints[1]) / 2
                    )}
                    sides={6}
                    stroke={line.color}
                    strokeWidth={line.lineThickness}
                  />
                );

              default:
                return console.error("유효한 tool type이 아닙니다.");
            }
          })}
        </Layer>
      </StageStyled>

      <div className="tools">
        <div>
          {TYPES.map((type) => {
            return (
              <Button
                key={type.en}
                value={type.en}
                checked={toolType === type.en}
                onClick={(e) => setToolType(e.target.value)}
              >
                {type.ko}
              </Button>
            );
          })}
          <Button onClick={(e) => setLines([])}>초기화</Button>
        </div>

        <div>
          <CirclePicker
            color={color}
            colors={COLORS}
            onChangeComplete={(color) => setColor(color.hex)}
          />
        </div>

        <div>
          선 두께:
          <input
            type="range"
            value={lineThickness}
            min={5}
            max={50}
            onChange={(e) => setLineThickness(Number(e.target.value))}
          />
          {lineThickness}px
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
