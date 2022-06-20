import { ReactElement, SVGProps } from "react";

const HomeIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    stroke="currentcolor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="M12 20v10H4V12L16 2l12 10v18h-8V20Z" />
  </svg>
);

export default HomeIcon;
