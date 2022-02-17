import { useState } from "react";
import { Stage, Layer, Line } from "react-konva";

function App() {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([
    {
      tool: "pen",
      points: [127, 236, 173, 372, 409, 230],
    },
  ]);
  const [isDrawing, setIsDrawing] = useState(false);

  const onMouseDownHandler = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();

    setIsDrawing(true);
    setLines([...lines, { tool, points: [x, y] }]);
  };
  console.log(lines);
  const onMouseMoveHandler = (e) => {
    if (!isDrawing) return;

    const newLines = [...lines];
    const lastLine = newLines[newLines.length - 1];
    const { x, y } = e.target.getStage().getPointerPosition();

    lastLine.points = [...lastLine.points, x, y];
    newLines[newLines.length - 1] = lastLine;

    setLines(newLines);
  };

  const onMouseUpHandler = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={onMouseUpHandler}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={10}
              tension={1}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
