// Custom Legend Content for handling long legend text
function CustomLegendContent(props) {
  const { payload } = props;
  if (!payload || !payload.length) return null;

  return (
    <div
      style={{
        fontSize: "11px",
        lineHeight: "1.4",
        maxWidth: "120px",
        wordWrap: "break-word",
        paddingLeft: "10px",
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "4px",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: entry.color,
              borderRadius: "2px",
              flexShrink: 0,
              marginTop: "2px",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              color: "#666",
              wordBreak: "break-word",
              lineHeight: "1.3",
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomLegendContent;
