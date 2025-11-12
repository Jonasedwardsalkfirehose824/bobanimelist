import { useState, useMemo, useEffect } from 'react';
import { useGetSeasonsListQuery, useGetSeasonAnimeQuery } from '@/services/jikan';
import type { SeasonName } from '@/services/jikan/models/schedule/season-archive.model';
import { SeasonSelector, SeasonAnimeList, SeasonSkeleton } from '@/components/widgets/seasons';
import Label from '@/components/atoms/label';
import { ErrorState } from '@/components/atoms/error-state';
import styles from './SeasonsPage.module.scss';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_SEASON = (() => {
	const month = new Date().getMonth();
	if (month < 3) return 'winter';
	if (month < 6) return 'spring';
	if (month < 9) return 'summer';
	return 'fall';
})() as SeasonName;

const SEASON_LABELS: Record<SeasonName, string> = {
	winter: 'Winter',
	spring: 'Spring',
	summer: 'Summer',
	fall: 'Fall',
};

export const SeasonsPage = () => {
	const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
	const [selectedSeason, setSelectedSeason] = useState<SeasonName>(CURRENT_SEASON);

	const { data: seasonsData, isLoading: seasonsLoading } = useGetSeasonsListQuery();
	const { data, isLoading, isError } = useGetSeasonAnimeQuery({
		year: selectedYear,
		season: selectedSeason,
		page: 1,
		limit: 25,
		sfw: true,
	});

	const years = useMemo(() => {
		if (!seasonsData?.data) return [CURRENT_YEAR];
		return seasonsData.data.map(item => item.year).sort((a, b) => b - a);
	}, [seasonsData]);

	const availableSeasons: SeasonName[] = useMemo(() => {
		if (!seasonsData?.data) return ['winter', 'spring', 'summer', 'fall'];
		const yearData = seasonsData.data.find(item => item.year === selectedYear);
		return yearData?.seasons || ['winter', 'spring', 'summer', 'fall'];
	}, [seasonsData, selectedYear]);

	// Scroll to top when season or year changes
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [selectedYear, selectedSeason]);

	return (
		<div className={styles['seasons-page']}>
			<header className={styles['seasons-page__header']}>
				<Label as="h1" font="typo-primary-xl-semibold" className={styles['seasons-page__title']}>
					Anime Seasons Archive
				</Label>
				<Label as="p" font="typo-primary-l-regular" className={styles['seasons-page__subtitle']}>
					Browse anime by season and year
				</Label>
			</header>

			<SeasonSelector
				selectedYear={selectedYear}
				selectedSeason={selectedSeason}
				years={years}
				availableSeasons={availableSeasons}
				onYearChange={setSelectedYear}
				onSeasonChange={setSelectedSeason}
				isLoading={seasonsLoading}
				currentYear={CURRENT_YEAR}
				currentSeason={CURRENT_SEASON}
				className={styles['seasons-page__filters']}
			/>

			<main className={styles['seasons-page__content']}>
				{isLoading && (
					<SeasonSkeleton 
						count={12} 
						className={styles['seasons-page__loading']} 
					/>
				)}

				{isError && (
					<ErrorState message="Failed to load seasonal anime. Please try again later." />
				)}

				{!isLoading && !isError && data?.data && (
					<SeasonAnimeList
						anime={data.data}
						seasonLabel={SEASON_LABELS[selectedSeason]}
						year={selectedYear}
						className={styles['seasons-page__grid-container']}
					/>
				)}
			</main>
		</div>
	);
};

export default SeasonsPage;
