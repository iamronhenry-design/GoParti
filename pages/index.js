export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "grid",
      placeItems: "center",
      fontFamily: "sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>GoParti</h1>
        <p style={{ opacity: 0.7 }}>
          Your AI-powered nightlife search starts here 🚀
        </p>
      </div>
    </div>
  );
}
