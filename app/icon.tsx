import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #3c2415 0%, #8c5a2b 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #f7e7ce",
            borderRadius: "8px",
            color: "#f7e7ce",
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            height: 24,
            justifyContent: "center",
            lineHeight: 1,
            paddingTop: 1,
            width: 24,
          }}
        >
          C
        </div>
      </div>
    ),
    size,
  )
}
