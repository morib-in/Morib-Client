const cdnUrl = import.meta.env.VITE_IMAGE_CDN_URL;
const HoverPauseIcon = `${cdnUrl}hoverpause.svg`;
const HoverPlayIcon = `${cdnUrl}hoverplay.svg`;
const PauseIcon = `${cdnUrl}defaultpause.svg`;
const PlayIcon = `${cdnUrl}defaultplay.svg`;

interface ButtonTimerPlayProps {
	onClick: () => void;
	isPlaying: boolean;
}

const ButtonTimerPlay = ({ onClick, isPlaying }: ButtonTimerPlayProps) => {
	const IconComponent = isPlaying ? PauseIcon : PlayIcon;
	const HoverIconComponent = isPlaying ? HoverPauseIcon : HoverPlayIcon;

	return (
		<button onClick={onClick} className="group relative">
			<img src={IconComponent} className="block group-hover:hidden" />
			<img src={HoverIconComponent} className="hidden group-hover:block" />
		</button>
	);
};

export default ButtonTimerPlay;
