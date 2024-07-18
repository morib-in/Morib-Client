interface ProgressCircleProps {
	isPlaying: boolean;
	timer: number;
}

const ProgressCircle = ({ timer }: ProgressCircleProps) => {
	const radius = 224;
	const circumference = 2 * Math.PI * radius;

	const progress = ((timer % 3600) / 3600) * 100;
	const offset = circumference - (progress / 100) * circumference;
	const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
	const endX = 240 + radius * Math.cos(angle);
	const endY = 240 + radius * Math.sin(angle);

	return (
		<svg width="480" height="480">
			<circle cx="240" cy="240" r={radius} stroke="#292D34" strokeWidth="32" fill="none" />
			<circle
				cx="240"
				cy="240"
				r={radius}
				stroke="url(#paint0_linear_1570_35)"
				strokeWidth="33"
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				style={{
					transition: 'stroke-dashoffset 100ms linear',
					transform: 'rotate(-90deg)',
					transformOrigin: '50% 50%',
				}}
			/>
			<circle cx={endX} cy={endY} r="13.5" fill="#FFFFFF" />
			<defs>
				<linearGradient
					id="paint0_linear_1570_35"
					x1="45.6469"
					x2="464"
					y1="77.276"
					y2="-11.5337"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00F2C6" />
					<stop offset="1" stopColor="#A5FFFD" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default ProgressCircle;
