export function BgDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="blob" style={{ background: "var(--ylyto-yellow)", width: 320, height: 320, top: -80, left: -60 }} />
      <div className="blob" style={{ background: "var(--ylyto-pink)", width: 380, height: 380, top: 120, right: -120 }} />
      <div className="blob" style={{ background: "var(--ylyto-blue)", width: 260, height: 260, bottom: -80, left: "30%" }} />
      <div className="blob" style={{ background: "var(--ylyto-purple)", width: 220, height: 220, bottom: 40, right: "20%", opacity: 0.35 }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stars" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
            <circle cx="40" cy="30" r="1.5" fill="currentColor" />
            <circle cx="25" cy="50" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    </div>
  );
}