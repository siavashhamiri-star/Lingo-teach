
import type { SVGProps } from 'react';

const TavanaLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22V18" />
    <path d="M9 18H15" />
    <path d="M12 15V13" />
    <circle cx="12" cy="11" r="1" />
    <path d="M12 2L19.5 6L12 10L4.5 6L12 2Z" />
    <path d="M4.5 6V14" />
    <path d="M19.5 6V14" />
    <path d="M12 10V8" />
  </svg>
);

export default TavanaLogo;
