import { useState } from 'react';

import PauseIcon from '@/assets/svgs/defaultpause.svg?react';
import PlayIcon from '@/assets/svgs/defaultplay.svg?react';
import HoverPauseIcon from '@/assets/svgs/hoverpause.svg?react';
import HoverPlayIcon from '@/assets/svgs/hoverplay.svg?react';

interface PlayBtnProps {
	onClick: () => void;
	isPlaying: boolean;
}

const PlayBtn = ({ onClick, isPlaying }: PlayBtnProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const icon = isPlaying ? (
		isHovered ? (
			<HoverPauseIcon />
		) : (
			<PauseIcon />
		)
	) : isHovered ? (
		<HoverPlayIcon />
	) : (
		<PlayIcon />
	);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			tabIndex={0}
			style={{ cursor: 'pointer' }}
		>
			{icon}
		</button>
	);
};

export default PlayBtn;
