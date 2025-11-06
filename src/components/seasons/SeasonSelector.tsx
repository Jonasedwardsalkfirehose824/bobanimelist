import { type FC } from 'react';
import Label from '@/components/atoms/label';
import classNames from 'classnames';
import type { SeasonName } from '@/services/jikan/models/schedule/season-archive.model';

interface SeasonSelectorProps {
	selectedYear: number;
	selectedSeason: SeasonName;
	years: number[];
	availableSeasons: SeasonName[];
	onYearChange: (year: number) => void;
	onSeasonChange: (season: SeasonName) => void;
	isLoading?: boolean;
	currentYear: number;
	currentSeason: SeasonName;
	className?: string;
}

const SEASON_LABELS: Record<SeasonName, string> = {
	winter: 'Winter',
	spring: 'Spring',
	summer: 'Summer',
	fall: 'Fall',
};

const SEASON_ICONS: Record<SeasonName, string> = {
	winter: '❄️',
	spring: '🌸',
	summer: '☀️',
	fall: '🍂',
};

export const SeasonSelector: FC<SeasonSelectorProps> = ({
	selectedYear,
	selectedSeason,
	years,
	availableSeasons,
	onYearChange,
	onSeasonChange,
	isLoading = false,
	currentYear,
	currentSeason,
	className,
}) => {
	const isCurrentSeason = selectedYear === currentYear && selectedSeason === currentSeason;

	return (
		<div className={className}>
			{/* Year Selector */}
			<div>
				<Label 
					as="label" 
					font="typo-primary-m-semibold"
					style={{ 
						display: 'block',
						marginBottom: 'var(--s-spacing-3)',
						color: 'var(--s-color-fg-primary)',
					}}
				>
					Year
				</Label>
				<select
					value={selectedYear}
					onChange={(e) => onYearChange(Number(e.target.value))}
					disabled={isLoading}
					aria-label="Select year"
					style={{
						width: '100%',
						maxWidth: '240px',
					}}
				>
					{years.map(year => (
						<option key={year} value={year}>
							{year} {year === currentYear && '(Current)'}
						</option>
					))}
				</select>
			</div>

			{/* Season Tabs */}
			<nav aria-label="Season selector">
				<div style={{ 
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
					gap: 'var(--s-spacing-3)'
				}}>
					{(['winter', 'spring', 'summer', 'fall'] as SeasonName[]).map((season) => {
						const isAvailable = availableSeasons.includes(season);
						const isActive = selectedSeason === season;
						const isCurrent = currentYear === selectedYear && season === currentSeason;

						return (
							<button
								key={season}
								onClick={() => isAvailable && onSeasonChange(season)}
								disabled={!isAvailable}
								className={classNames(
									isActive && 'active',
									!isAvailable && 'disabled'
								)}
								aria-pressed={isActive}
								aria-label={`${SEASON_LABELS[season]}${isCurrent ? ' (Current)' : ''}`}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 'var(--s-spacing-2)',
								}}
							>
								<span aria-hidden="true">{SEASON_ICONS[season]}</span>
								<span>{SEASON_LABELS[season]}</span>
								{isCurrent && isCurrentSeason && (
									<span 
										style={{
											padding: '2px 8px',
											background: 'rgba(255, 255, 255, 0.25)',
											borderRadius: '6px',
											fontSize: '0.7rem',
											fontWeight: 700,
											textTransform: 'uppercase',
											letterSpacing: '0.05em',
										}}
										aria-hidden="true"
									>
										Current
									</span>
								)}
							</button>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default SeasonSelector;
