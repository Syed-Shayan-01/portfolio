import { ImageResponse } from "next/og";
export const alt = "Syed Shayan — Data Science Student Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#08080D", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 28, color: "#6f6fff", letterSpacing: 6 }}>DATA SCIENCE PORTFOLIO</div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, marginTop: 20 }}>Syed Shayan</div>
        <div style={{ display: "flex", fontSize: 38, color: "#A1A1AA", marginTop: 16 }}>Turning data into clearer decisions.</div>
        <div style={{ display: "flex", height: 6, width: 180, background: "#0606C1", marginTop: 48 }} />
      </div>
    ),
    size
  );
}
