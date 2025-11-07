import { useGetAnimeStaffQuery } from '@/services/jikan';
import { Link } from 'react-router';
import Image from '@/components/atoms/image';
import Label from '@/components/atoms/label';
import styles from './StaffGrid.module.scss';
import classNames from 'classnames';

interface StaffGridProps {
	animeId: number;
	className?: string;
}

export const StaffGrid = ({ animeId, className }: StaffGridProps) => {
	const { data, isLoading, isError } = useGetAnimeStaffQuery({ id: animeId });

	if (isLoading) {
		return (
			<div className={classNames(styles['staff-grid'], className)}>
				<Label as="h3" font="typo-primary-l-semibold" className={styles['staff-grid__title']}>
					Staff
				</Label>
				<div className={styles['staff-grid__container']}>
					{[...Array(8)].map((_, i) => (
						<div key={i} className={classNames(styles['staff-card'], styles['staff-card--loading'])}>
							<div className={styles['staff-card__image']} />
							<div className={styles['staff-card__content']}>
								<div className={styles['staff-card__name']} />
								<div className={styles['staff-card__role']} />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (isError || !data?.data || data.data.length === 0) {
		return null;
	}

	const staffWithImages = data.data.filter((staff) => {
		const imageUrl = staff.person.images.jpg.image_url;
		return imageUrl && !imageUrl.includes('questionmark');
	});

	if (staffWithImages.length === 0) {
		return null;
	}

	return (
		<div className={classNames(styles['staff-grid'], className)}>
			<Label as="h3" font="typo-primary-l-semibold" className={styles['staff-grid__title']}>
				Staff
			</Label>
			<div className={styles['staff-grid__container']}>
				{staffWithImages.map((staff, index) => (
					<Link
						key={`${staff.person.mal_id}-${index}`}
						to={`/people/${staff.person.mal_id}`}
						className={styles['staff-card']}
						aria-label={`View ${staff.person.name} profile`}
					>
						<div className={styles['staff-card__image']}>
							<Image
								src={staff.person.images.jpg.image_url}
								alt={staff.person.name}
								className={styles['staff-card__img']}
							/>
						</div>
						<div className={styles['staff-card__content']}>
							<Label as="h4" font="typo-primary-m-medium" className={styles['staff-card__name']}>
								{staff.person.name}
							</Label>
							<Label as="p" font="typo-primary-s-regular" className={styles['staff-card__role']}>
								{staff.positions.join(', ')}
							</Label>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default StaffGrid;
