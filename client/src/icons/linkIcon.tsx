import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { className?: string };

const LinkIcon = ({ className = 'text-gray-300', ...rest }: Props) => {
  const combined = `${className}`.trim();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      className={combined}
      role="img"
      aria-hidden="false"
      {...rest}
    >
      <title>Link</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  );
};

export default LinkIcon;
