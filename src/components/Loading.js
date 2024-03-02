import "../style.css";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="load">
        <div className="ane1"></div>
        <div className="ane2"></div>
        <div className="ane3"></div>
      </div>
    </div>
  );
}
