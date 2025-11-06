import type { IconProps } from './icon.model';

const CalendarIcon = ({ size = 24, color = 's-color-fg-primary', className }: IconProps) => (
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
			d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16 2V6"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M8 2V6"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3 10H21"
			stroke={`var(--${color})`}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default CalendarIcon;
