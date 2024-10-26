export const XmtpIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff87" />
        <stop offset="50%" stopColor="#60efff" />
        <stop offset="100%" stopColor="#0061ff" />
      </linearGradient>
    </defs>
    {/* Aurora background */}
    <circle cx="16" cy="16" r="16" fill="url(#aurora-gradient)" />
    
    {/* Glow effect */}
    <circle cx="16" cy="16" r="12" fill="#ffffff" fillOpacity="0.3" />
    
    {/* ETH icon */}
    <g transform="translate(6, 6) scale(0.625)">
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"
        fill="#FFF"
      />
      <path
        d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
        fill="#FFF"
        fillOpacity="0.5"
      />
      <path
        d="M16.498 20.573l7.497-4.353-7.497-3.348z"
        fill="#FFF"
        fillOpacity="0.5"
      />
      <path
        d="M9 16.22l7.498 4.353v-7.701z"
        fill="#FFF"
        fillOpacity="0.8"
      />
    </g>
  </svg>
);
