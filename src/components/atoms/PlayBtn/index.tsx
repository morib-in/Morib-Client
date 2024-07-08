import React, { useState } from 'react';

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

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') onClick();
	};

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
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			role="button"
			tabIndex={0}
			style={{ cursor: 'pointer' }}
		>
			{icon}
		</div>
	);
};

export default PlayBtn;
