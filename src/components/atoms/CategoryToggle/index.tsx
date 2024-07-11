interface CategoryToggleProps {
	isToggleOn: boolean;
	onToggle: () => void;
}

const CategoryToggle = ({ isToggleOn, onToggle }: CategoryToggleProps) => {
	return (
		<div className="relative cursor-pointer" onClick={onToggle}>
			<div
				className={`h-[1.9rem] w-[3.3rem] rounded-full ${isToggleOn ? 'bg-secondary' : 'bg-gray-bg-05'} transition-all duration-500`}
			/>
			<div
				className={`absolute top-[0.2rem] ${isToggleOn ? 'left-[1.5rem]' : 'left-[0.3rem]'} h-[1.5rem] w-[1.5rem] rounded-full bg-white transition-all duration-500`}
			/>
		</div>
	);
};

export default CategoryToggle;
