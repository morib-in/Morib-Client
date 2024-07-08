import React, { useState } from 'react';

import PauseIcon from '@/assets/svgs/defaultpause.svg?react';
import PlayIcon from '@/assets/svgs/defaultplay.svg?react';
import HoverPauseIcon from '@/assets/svgs/hoverpause.svg?react';
import HoverPlayIcon from '@/assets/svgs/hoverplay.svg?react';

const PlayBtn = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = () => setIsPlaying(!isPlaying);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') handleClick();
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
			onClick={handleClick}
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
