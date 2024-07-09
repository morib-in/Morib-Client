import PauseIcon from '@/assets/svgs/defaultpause.svg?react';
import PlayIcon from '@/assets/svgs/defaultplay.svg?react';
import HoverPauseIcon from '@/assets/svgs/hoverpause.svg?react';
import HoverPlayIcon from '@/assets/svgs/hoverplay.svg?react';

interface PlayBtnProps {
	onClick: () => void;
	isPlaying: boolean;
}

const PlayBtn = ({ onClick, isPlaying }: PlayBtnProps) => {
	const IconComponent = isPlaying ? PauseIcon : PlayIcon;
	const HoverIconComponent = isPlaying ? HoverPauseIcon : HoverPlayIcon;

	return (
		<button onClick={onClick} className="group relative">
			<IconComponent className="block group-hover:hidden" />
			<HoverIconComponent className="hidden group-hover:block" />
		</button>
	);
};

export default PlayBtn;
