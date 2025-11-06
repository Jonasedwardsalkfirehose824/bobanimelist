import { type FC } from 'react';
import { ImageCardLoading } from '@/components/atoms/image-card/ImageCard';

interface SeasonSkeletonProps {
	count?: number;
	className?: string;
}

export const SeasonSkeleton: FC<SeasonSkeletonProps> = ({ 
	count = 12,
	className,
}) => {
	return (
		<div 
			className={className}
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
				gap: 'var(--s-spacing-5)',
				animation: 'fadeInUp 0.5s ease-out',
			}}
			aria-busy="true"
			aria-label="Loading anime"
			role="status"
		>
			{Array.from({ length: count }).map((_, i) => (
				<ImageCardLoading key={i} grid />
			))}
		</div>
	);
};

export default SeasonSkeleton;
