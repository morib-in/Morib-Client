interface CircleColorIconProps {
	color: string;
	size?: string;
	onClick?: () => void;
}

const CircleColorIcon = ({ color, size, onClick }: CircleColorIconProps) => {
	return <button onClick={onClick} className={`flex-shrink-0 rounded-[31px] ${size} ${color}`} />;
};

export default CircleColorIcon;
