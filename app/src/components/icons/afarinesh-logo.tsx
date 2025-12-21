import type { SVGProps } from 'react';

const AfarineshLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L12 22" />
    <path d="M22 12L2 12" />
    <path d="M18.36 18.36L5.64 5.64" />
    <path d="M18.36 5.64L5.64 18.36" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="10" strokeDasharray="2 4" />
  </svg>
);

export default AfarineshLogo;
