export const logoSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 768"
    fill="none"
    className="w-full h-full">
    <defs>
      <linearGradient id="auroraGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#ff00f2" />
        <stop offset="100%" stopColor="#ff8c00" />
      </linearGradient>
    </defs>
    <path
      d="M10,400 C200,300 400,500 600,400 C800,300 1024,500 1024,300"
      stroke="url(#auroraGradient)"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M0,350 C150,250 300,450 500,350 C700,250 1024,450 1024,250"
      stroke="url(#auroraGradient)"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M0,300 C120,200 320,400 520,300 C720,200 1024,400 1024,200"
      stroke="url(#auroraGradient)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);