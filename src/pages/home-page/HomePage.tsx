import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useGetSeasonAnimeQuery } from '@/services/jikan';
import { useLazyGetRandomAnimeQuery } from '@/services/jikan/randomApi';
import ImageCard, { ImageCardLoading } from '@/components/atoms/image-card/ImageCard';
import Label from '@/components/atoms/label';
import { ErrorState } from '@/components/atoms/error-state';
import styles from './HomePage.module.scss';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_SEASON = (() => {
	const month = new Date().getMonth();
	if (month < 3) return 'winter';
	if (month < 6) return 'spring';
	if (month < 9) return 'summer';
	return 'fall';
})() as 'winter' | 'spring' | 'summer' | 'fall';

export const HomePage = () => {
	const navigate = useNavigate();
	const heroRef = useRef<HTMLDivElement>(null);
	const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

	// Fetch current season anime
	const { data: seasonData, isLoading: seasonLoading, isError: seasonError } = useGetSeasonAnimeQuery({
		year: CURRENT_YEAR,
		season: CURRENT_SEASON,
		page: 1,
		limit: 12,
		sfw: true,
	});

	// Fetch random featured anime
	const [getRandomAnime, { data: randomData, isLoading: randomLoading }] = useLazyGetRandomAnimeQuery();

	useEffect(() => {
		getRandomAnime();
	}, [getRandomAnime]);

	// 3D Tilt effect handler
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!heroRef.current) return;

		const rect = heroRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// Calculate rotation based on cursor position
		// Max tilt: 8 degrees
		const rotateY = ((x - centerX) / centerX) * 8;
		const rotateX = ((centerY - y) / centerY) * 8;

		setTiltStyle({
			transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
			transition: 'transform 0.15s ease-out',
		});
	};

	const handleMouseLeave = () => {
		setTiltStyle({
			transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
			transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
		});
	};

	return (
		<div className={styles['home-page']}>
			{/* Hero Section with 3D Tilt */}
			<section 
				ref={heroRef}
				className={styles['home-page__hero']}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={tiltStyle}
			>
				<div className={styles['home-page__hero-content']}>
					<Label as="h1" font="typo-primary-xl-semibold" className={styles['home-page__hero-title']}>
						Welcome to bobanimelist
					</Label>
					<Label as="p" font="typo-primary-l-regular" className={styles['home-page__hero-subtitle']}>
						Discover your next favorite anime, manga, and more!
					</Label>
					<div className={styles['home-page__hero-buttons']}>
						<button 
							onClick={() => navigate('/anime')}
							className={styles['home-page__hero-btn']}
						>
							Browse Anime
						</button>
						<button 
							onClick={() => navigate('/manga')}
							className={styles['home-page__hero-btn']}
						>
							Browse Manga
						</button>
						<button 
							onClick={() => navigate('/schedule')}
							className={styles['home-page__hero-btn-secondary']}
						>
							View Schedule
						</button>
					</div>
				</div>
			</section>

			{/* Random Featured Anime */}
			{!randomLoading && randomData?.data && (
				<section className={styles['home-page__featured']}>
					<div className={styles['home-page__featured-card']}>
						<div className={styles['home-page__featured-image']}>
							<img 
								src={randomData.data.images.jpg.large_image_url || randomData.data.images.jpg.image_url} 
								alt={randomData.data.title}
							/>
						</div>
						<div className={styles['home-page__featured-info']}>
							<Label as="span" font="typo-primary-s-semibold" className={styles['home-page__featured-badge']}>
								Featured
							</Label>
							<Label as="h2" font="typo-primary-xl-semibold" className={styles['home-page__featured-title']}>
								{randomData.data.title}
							</Label>
							<p className={styles['home-page__featured-synopsis']}>
								{randomData.data.synopsis?.substring(0, 300)}...
							</p>
							<button 
								onClick={() => navigate(`/anime/${randomData.data.mal_id}`)}
								className={styles['home-page__featured-btn']}
							>
								View Details
							</button>
						</div>
					</div>
				</section>
			)}

			{/* Current Season Anime */}
			<section className={styles['home-page__section']}>
				<div className={styles['home-page__section-header']}>
					<Label as="h2" font="typo-primary-xl-semibold" className={styles['home-page__section-title']}>
						{CURRENT_SEASON.charAt(0).toUpperCase() + CURRENT_SEASON.slice(1)} {CURRENT_YEAR} Anime
					</Label>
					<button 
						onClick={() => navigate('/seasons')}
						className={styles['home-page__section-link']}
					>
						View All
					</button>
				</div>

				{seasonLoading && (
					<div className={styles['home-page__grid']}>
						{Array.from({ length: 12 }).map((_, i) => (
							<ImageCardLoading key={i} grid />
						))}
					</div>
				)}

				{seasonError && (
					<ErrorState message="Failed to load seasonal anime" />
				)}

				{!seasonLoading && !seasonError && seasonData?.data && (
					<div className={styles['home-page__grid']}>
						{seasonData.data.map((anime, index) => (
							<ImageCard
								key={anime.mal_id}
								src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
								alt={anime.title}
								navigateTo={`/anime/${anime.mal_id}`}
								title={anime.title}
								ratings={anime.score ? String(anime.score) : undefined}
								grid
								index={index}
							/>
						))}
					</div>
				)}
			</section>

			{/* Quick Actions */}
			<section className={styles['home-page__actions']}>
				<button onClick={() => navigate('/seasons')} className={styles['home-page__action-card']}>
					<Label as="h3" font="typo-primary-l-semibold">Browse Seasons</Label>
					<Label as="p" font="typo-primary-m-regular">Explore anime by season</Label>
				</button>
				<button onClick={() => navigate('/schedule')} className={styles['home-page__action-card']}>
					<Label as="h3" font="typo-primary-l-semibold">Airing Schedule</Label>
					<Label as="p" font="typo-primary-m-regular">Check what's airing</Label>
				</button>
				<button onClick={() => navigate('/search')} className={styles['home-page__action-card']}>
					<Label as="h3" font="typo-primary-l-semibold">Search</Label>
					<Label as="p" font="typo-primary-m-regular">Find your anime</Label>
				</button>
			</section>
		</div>
	);
};

export default HomePage;
