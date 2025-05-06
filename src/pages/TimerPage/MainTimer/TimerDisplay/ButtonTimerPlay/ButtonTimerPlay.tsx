import { MouseEvent } from 'react';

import PauseIcon from '@/shared/assets/svgs/defaultpause.svg?react';
import PlayIcon from '@/shared/assets/svgs/defaultplay.svg?react';
import HoverPauseIcon from '@/shared/assets/svgs/hoverpause.svg?react';
import HoverPlayIcon from '@/shared/assets/svgs/hoverplay.svg?react';

interface ButtonTimerPlayProps {
	onClick: () => void;
	isPlaying: boolean;
	disabled?: boolean;
}

const ButtonTimerPlay = ({ onClick, isPlaying, disabled = false }: ButtonTimerPlayProps) => {
	const IconComponent = isPlaying ? PauseIcon : PlayIcon;
	const HoverIconComponent = isPlaying ? HoverPauseIcon : HoverPlayIcon;

	const handleClick = (e: MouseEvent) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		onClick();
	};

	return (
		<button
			onClick={handleClick}
			className={`group relative ${disabled ? 'cursor-not-allowed' : ''}`}
			disabled={disabled}
		>
			<IconComponent className="block group-hover:hidden" />
			<HoverIconComponent className="hidden group-hover:block" />
		</button>
	);
};

export default ButtonTimerPlay;
