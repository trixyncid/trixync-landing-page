import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Trixync — Technology & Systems Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#101726",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FCFDFF",
            marginBottom: 16,
          }}
        >
          Trix<span style={{ color: "#3866F2" }}>ync</span>
        </div>
        <div style={{ fontSize: 32, color: "#a8b0c2" }}>
          Technology & Systems Studio · Medan, Indonesia
        </div>
      </div>
    ),
    { ...size },
  );
}
