import type { IconProps } from './icon.model';

const ReviewIcon = ({ size = 24, color = 's-color-fg-primary', className }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={`icon ${className || ''}`}
		aria-hidden="true"
	>
		<path
			d="M21 11.5C21 16.7467 16.7467 21 11.5 21C9.50317 21 7.6565 20.3607 6.15686 19.2749L3 20L3.72512 16.8431C2.63932 15.3435 2 13.4968 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M7 10H7.01"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M11.5 10H11.51"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16 10H16.01"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ReviewIcon;
