import ScrambleText from "~/components/ScrambleText";

export function meta() {
  return [{ title: "Scramble Text — Demo" }];
}

export default function ScrambleRoute() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "#030303",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "clamp(360px, 80vw, 600px)",
          aspectRatio: "1 / 1",
          border: "1px solid #64133c",
          backgroundColor: "#220614",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.4em",
          padding: "1.5rem",
        }}
      >
        <ScrambleText
          variant="blocks"
          lines={[
            "Cuneyt Yildirim",
            "Full-Stack Developer",
            "React · React Native",
            "TypeScript · Node",
          ]}
        />
      </div>
    </div>
  );
}
