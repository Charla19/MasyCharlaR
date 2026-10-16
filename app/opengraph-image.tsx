import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#161a16", color: "#e9e9e1", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", inset: 12, border: "1px solid #394037", display: "flex" }} />
      <div style={{ position: "absolute", top: 42, left: 72, fontSize: 25, fontWeight: 800, letterSpacing: -1.5 }}>M.Charla.R.</div>
      <div style={{ position: "absolute", top: 48, right: 72, color: "#d7f836", fontSize: 15, letterSpacing: 2 }}>FULL-STACK · CLOUD · COMMUNAUTÉS</div>
      <div style={{ position: "absolute", top: 160, left: 72, display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 800, lineHeight: .98, letterSpacing: -6 }}>
        <span>Je construis</span>
        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, letterSpacing: -4 }}>des systèmes</span>
        <span>qui servent.</span>
      </div>
      <div style={{ position: "absolute", right: 108, top: 184, width: 210, height: 260, display: "flex", flexDirection: "column", justifyContent: "center", padding: 22, border: "2px solid #d7f836", background: "#1c211b", transform: "rotate(5deg)", boxShadow: "18px 22px 0 #303a2d" }}>
        <span style={{ fontSize: 12, color: "#afb8a9", letterSpacing: 2 }}>FULL-STACK / CLOUD</span>
        <span style={{ marginTop: 33, fontSize: 44, fontWeight: 800, lineHeight: .95, letterSpacing: -3 }}>M.<br />Charla.R</span>
        <span style={{ width: 35, height: 3, marginTop: 32, background: "#d7f836" }} />
      </div>
      <div style={{ position: "absolute", bottom: 50, left: 72, display: "flex", alignItems: "center", gap: 16, fontSize: 16, color: "#d7f836", letterSpacing: 2 }}>
        <span>ANTANANARIVO, MADAGASCAR</span><span style={{ width: 7, height: 7, borderRadius: 7, background: "#d7f836" }} /><span>CHARLAMASY.SITE</span>
      </div>
      <div style={{ position: "absolute", right: 72, bottom: 48, fontSize: 13, letterSpacing: 2, color: "#a9b0a5" }}>01 / 05</div>
    </div>,
    size,
  );
}
