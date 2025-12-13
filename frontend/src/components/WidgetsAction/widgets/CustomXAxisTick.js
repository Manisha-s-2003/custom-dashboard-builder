// Custom X-Axis Tick for handling long text labels
function CustomXAxisTick(props) {
  const { x, y, payload } = props;
  if (!payload || !payload.value) return null;

  const text = String(payload.value);
  const words = text.split(" ");
  const maxWidth = 80;
  const lineHeight = 12;

  // Split long text into multiple lines
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length * 5 > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * lineHeight + 5}
          textAnchor="middle"
          fontSize="10"
          fill="#666"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default CustomXAxisTick;
