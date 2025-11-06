import { useGetCharacterVoicesQuery } from '@/services/jikan';
import Label from '@/components/atoms/label';
import { Link } from 'react-router-dom';
import styles from './CharacterVoiceActors.module.scss';
import classNames from 'classnames';

interface CharacterVoiceActorsProps {
	characterId: number;
	className?: string;
}

export const CharacterVoiceActors = ({ characterId, className }: CharacterVoiceActorsProps) => {
	const { data, isLoading, isError } = useGetCharacterVoicesQuery({ id: characterId });

	if (isError) {
		return null;
	}

	if (isLoading) {
		return (
			<div className={classNames(styles['character-voices'], className)}>
				<Label as="h2" font="typo-primary-xl-semibold" className={styles['character-voices__title']}>
					Voice Actors
				</Label>
				<div className={styles['character-voices__grid']}>
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className={styles['character-voices__skeleton']} />
					))}
				</div>
			</div>
		);
	}

	if (!data?.data || data.data.length === 0) {
		return null;
	}

	return (
		<div className={classNames(styles['character-voices'], className)}>
			<div className={styles['character-voices__header']}>
				<Label as="h2" font="typo-primary-xl-semibold" className={styles['character-voices__title']}>
					Voice Actors
				</Label>
				<Label as="span" font="typo-primary-m-regular" className={styles['character-voices__count']}>
					{data.data.length} voice actors
				</Label>
			</div>

			<div className={styles['character-voices__grid']}>
				{data.data.map((item) => (
					<Link
						key={`${item.person.mal_id}-${item.language}`}
						to={`/people/${item.person.mal_id}`}
						className={styles['character-voices__card']}
					>
						<div className={styles['character-voices__image-wrapper']}>
							<img
								src={item.person.images.jpg.image_url}
								alt={item.person.name}
								className={styles['character-voices__image']}
								loading="lazy"
							/>
						</div>
						<div className={styles['character-voices__info']}>
							<Label as="h3" font="typo-primary-m-semibold" className={styles['character-voices__name']}>
								{item.person.name}
							</Label>
							<Label as="span" font="typo-primary-s-regular" className={styles['character-voices__language']}>
								{item.language}
							</Label>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CharacterVoiceActors;
